import { type NotesRes } from './controllers/notes';
import { type UserRes } from './controllers/user';

declare global {
  namespace Express {
    interface Request {
      profile?: UserRes;
      note?: NotesRes;
      auth?: { _id: number };
    }
  }
}
