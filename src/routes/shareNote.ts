import express from 'express';
import { type ShareNoteReq, SharedNoteController } from '../controllers/shareNotes';
import { getNoteById } from '../middleware/notes';
import { getUserById } from '../middleware/user';

const router = express.Router();
const shareNoteController = new SharedNoteController();

router.param('userId', getUserById);
router.param('notesId', getNoteById);

router.post('/share/:userId/:notesId', async (req, res) => {
  const userId = req.profile?.id;
  const shareNoteBody: ShareNoteReq = req.body;
  const data = await shareNoteController.shareNote(Number(userId), shareNoteBody);
  res.json(data);
});

export default router;
