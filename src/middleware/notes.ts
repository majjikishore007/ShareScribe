import { type Response, type NextFunction, type Request } from 'express';
import { NotesController } from '../controllers/notes';
import { CustomError, CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';
import { Permission } from '../models/sharedNotes';

const noteController = new NotesController();

export const getNoteById = async (req: Request, res: Response, next: NextFunction, noteId: number) => {
  try {
    const userId = req.profile?.id;
    if (userId !== undefined) {
      const data = await noteController.getNoteById(noteId, userId);
      if (data.data !== null) {
        req.note = data.data;
        next();
      } else {
        res.json(data);
      }
    } else {
      res.json(new CustomResponse(null, new CustomError('User not found', 404)));
    }
  } catch (error) {
    res.json(new CustomResponse(null, handleErrors(error)));
  }
};

// check if the user is allowed to update the note

export const isAuthorisedToEdit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checker =
      req.note != null && (req.note.permission === Permission.Owner || req.note.permission === Permission.ReadWrite);
    if (!checker) {
      res.status(403).json(new CustomResponse(null, new CustomError('Access denied', 403)));
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(new CustomResponse(null, handleErrors(error)));
  }
};
