import express from 'express';
import { AuthController, type UserSignUpRequest, type UserSignInRequest } from '../controllers/auth';

const router = express.Router();
const authController = new AuthController();

router.post('/signin', async (req, res) => {
  const body: UserSignInRequest = req.body;
  const data = await authController.signIn(body);
  res.cookie('auth_token', data?.data?.token, { httpOnly: true });
  res.json(data);
});
router.post('/signup', async (req, res) => {
  const body: UserSignUpRequest = req.body;
  const data = await authController.signup(body);
  res.cookie('auth_token', data?.data?.token, { httpOnly: true });
  res.json(data);
});
router.get('/signout', async (_req, res) => {
  console.log('signout route');
  const data = await authController.signOut();
  res.clearCookie('auth_token');
  res.json(data);
});

export default router;
