import { type NextFunction, type Request, type Response } from 'express';
import { expressjwt } from 'express-jwt';
import { _APP_SECRET_ } from '../credentials';
import { CustomError, CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('req.profile ', req.profile?.id, ' req.auth ', req.auth);
    const checker = req.profile != null && req.auth != null && req.profile.id === req.auth._id;
    if (!checker) {
      res.status(403).json(new CustomResponse(null, new CustomError('Access denied', 403)));
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(new CustomResponse(null, handleErrors(error)));
  }
};

export const isSignedIn = expressjwt({
  secret: _APP_SECRET_,
  requestProperty: 'auth',
  algorithms: ['RS256', 'HS256']
});
