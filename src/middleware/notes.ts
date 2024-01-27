import { type Response, type NextFunction, type Request } from 'express';
import { NotesController } from '../controllers/notes';
import { CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';

const noteController = new NotesController();

export const getNoteById = async (req: Request, res: Response, next: NextFunction, noteId: number) => {
  try {
    const data = await noteController.getNoteById(noteId);
    if (data.data !== null) {
      req.note = data.data;
      next();
    } else {
      res.json(data);
    }
  } catch (error) {
    res.json(new CustomResponse(null, handleErrors(error)));
  }
};
