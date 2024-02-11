import { type NextFunction, type Request, type Response } from 'express';
import { UserController } from '../controllers/user';
import { CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';

const userController = new UserController();

export const getUserById = async (req: Request, res: Response, next: NextFunction, id: number) => {
  try {
    const data = await userController.getUserById(id);
    if (data.data !== null) {
      req.profile = data.data;
      next();
    } else {
      res.json(data);
    }
  } catch (error) {
    res.json(new CustomResponse(null, handleErrors(error)));
  }
};
