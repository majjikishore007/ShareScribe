import express from 'express';
import { UserController } from '../controllers/user';
import { getUserById } from '../middleware/user';
import { CustomError, CustomResponse } from '../types';
import { isAuthenticated, isSignedIn } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

router.get('/all', isSignedIn, async (_req, res) => {
  const data = await userController.getAllUsers();
  res.json(data);
});

router.param('userId', getUserById);

router.get('/:userId', isSignedIn, isAuthenticated, async (req, res) => {
  if (req?.profile !== null) {
    res.status(200).json(new CustomResponse(req.profile, null));
  } else {
    res.status(404).json(new CustomResponse(null, new CustomError('User not found', 404)));
  }
});
export default router;
