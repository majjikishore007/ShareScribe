import express from 'express';
import {
  type RemovePermissionReq,
  SharedNoteController,
  type ShareNoteReq,
  type UpdatePermissionReq
} from '../controllers/shareNotes';
import { getNoteById } from '../middleware/notes';
import { getUserById } from '../middleware/user';

const router = express.Router();
const shareNoteController = new SharedNoteController();

router.param('userId', getUserById);
router.param('notesId', getNoteById);

router.post('/share/:userId/', async (req, res) => {
  const userId = req.profile?.id;
  console.log('userId ', userId);
  const shareNoteBody: ShareNoteReq = req.body;
  const data = await shareNoteController.shareNote(Number(userId), shareNoteBody);
  res.json(data);
});
router.put('/update-premission/:userId/', async (req, res) => {
  const userId = req.profile?.id;
  const updatePermissionBody: UpdatePermissionReq = req.body;
  const data = await shareNoteController.updatePermission(Number(userId), updatePermissionBody);
  res.json(data);
});
router.post('/remove-permission/:userId/', async (req, res) => {
  const userId = req.profile?.id;
  const removePermissionBody: RemovePermissionReq = req.body;
  const data = await shareNoteController.removePermission(Number(userId), removePermissionBody);
  res.json(data);
});
export default router;
