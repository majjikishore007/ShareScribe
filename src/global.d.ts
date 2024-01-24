import { type User } from './models/user';

declare global {
  namespace Express {
    interface Request {
      profile?: User;
      auth?: { _id: number };
    }
  }
}
