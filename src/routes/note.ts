import express from 'express';
import { NotesController, type NoteCreationReq } from '../controllers/notes';
import { isAuthenticated, isSignedIn } from '../middleware/auth';
import { getUserById } from '../middleware/user';

const router = express.Router();
const noteController = new NotesController();

router.param('userId', getUserById);

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

// router.get('/:userId/:noteId', isSignedIn, isAuthenticated, async (req, res) => {
//   const { noteId, userId } = req.params;
//   const data = await noteController.getNoteById(noteId, userId);
//   res.json(data);
// });

export default router;
