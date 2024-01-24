import { Controller, Get, Path, Route, Security, Tags } from 'tsoa';
import { AppDataSource } from '../config/database/ormconfig';
import { User } from '../models/user';
import { CustomError, CustomResponse } from '../types';
import { filterUsers, handleErrors } from '../utils/utils';

export interface GetUserByIdRequest {
  id: number;
}
export interface UserRes {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Route('user')
@Tags('User')
export class UserController extends Controller {
  private readonly userRepository = AppDataSource.getRepository(User);

  @Get('all')
  @Security('jwt')
  public async getAllUsers(): Promise<CustomResponse<UserRes[] | null>> {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) {
        return new CustomResponse(null, new CustomError('No users found', 404));
      }
      const userRes = filterUsers(users);
      return new CustomResponse(userRes, null);
    } catch (error: any) {
      console.log('error ', error);
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Get('{userId}')
  @Security('jwt')
  public async getUserById(@Path() userId: number): Promise<CustomResponse<UserRes | null>> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user === null) {
        return new CustomResponse(null, new CustomError('User not found', 404));
      }
      const userRes = filterUsers([user]);
      return new CustomResponse(userRes[0], null);
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }
}
