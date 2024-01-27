import express from 'express';
import { NotesController, type NoteCreationReq } from '../controllers/notes';
import { isAuthenticated, isSignedIn } from '../middleware/auth';
import { getUserById } from '../middleware/user';
import { getNoteById } from '../middleware/notes';
import { CustomError, CustomResponse } from '../types';

const router = express.Router();
const noteController = new NotesController();

router.param('userId', getUserById);
router.param('noteId', getNoteById);

router.post('/create/:userId', isSignedIn, isAuthenticated, async (req, res) => {
  const userId = req.profile?.id;
  const notesReq: NoteCreationReq = req.body;
  if (userId === undefined) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const data = await noteController.createNote(userId, notesReq);
  res.json(data);
});

router.get('/:userId/:noteId', isSignedIn, isAuthenticated, async (req, res) => {
  if (req.note === null) {
    res.json(new CustomResponse(null, new CustomError('Note not found', 404)));
    return;
  }
  res.json(new CustomResponse(req.note, null));
});
router.get('/:userId/all', isSignedIn, isAuthenticated, async (req, res) => {
  const userId = req.profile?.id;
  const notesList = noteController.getAllNotes(Number(userId));
  res.json(notesList);
});
router.put('/:userId/:noteId', isSignedIn, isAuthenticated, async (req, res) => {
  const noteId = req.note?.id;
  const notesReq: NoteCreationReq = req.body;
  const data = await noteController.updateNote(Number(noteId), notesReq);
  res.json(data);
});
router.delete('/:userId/:noteId', isSignedIn, isAuthenticated, async (req, res) => {
  const noteId = req.note?.id;
  const data = await noteController.deleteNoteById(Number(noteId));
  res.json(data);
});
export default router;
