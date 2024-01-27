import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';
import { _APP_SECRET_ } from '../credentials';
import { type User } from '../models/user';
import { CustomError } from '../types';

export const hashPassword = (plainPassword: string): string => {
  return createHmac('sha256', _APP_SECRET_).update(plainPassword).digest('hex');
};
export const createJWTToken = (id: number): string => {
  return jwt.sign({ _id: id }, _APP_SECRET_, { expiresIn: '10h' });
};

export const handleErrors = (error: any): CustomError => {
  const errorMessage = 'Internal Server Error';
  const statusCode = 500;
  if (error instanceof Error) {
    return new CustomError(error.message, statusCode);
  }
  return new CustomError(errorMessage, statusCode);
};

export const filterUsers = (users: User[]) => {
  // remove the password property from each user
  const filteredUsers = users.map((user) => {
    const { passwordHash, ...rest } = user;
    return rest;
  });
  return filteredUsers;
};
