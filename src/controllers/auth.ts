import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../config/database/ormconfig';
import { User } from '../models/user';
import { CustomError, CustomResponse } from '../types';
import { createJWTToken, handleErrors, hashPassword } from '../utils/utils';

export interface UserSignInRequest {
  email: string;
  password: string;
}

export interface UserSignUpRequest {
  username: string;
  email: string;
  password: string;
}

@Route('auth')
@Tags('Authentication')
export class AuthController extends Controller {
  private readonly userRepository = AppDataSource.getRepository(User);

  @Post('signup')
  public async signup(@Body() userSignUpRequest: UserSignUpRequest): Promise<CustomResponse<{ token: string } | null>> {
    try {
      const { username, email, password } = userSignUpRequest;

      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser !== null) {
        return new CustomResponse(null, new CustomError('User already exists', 400));
      }
      const passwordHash = hashPassword(password);
      const newUser = this.userRepository.create({ username, email, passwordHash });
      await this.userRepository.save(newUser);

      const token = createJWTToken(newUser.id);
      return new CustomResponse({ token }, null);
    } catch (error: any) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Post('signin')
  public async signIn(@Body() userSignInRequest: UserSignInRequest): Promise<CustomResponse<{ token: string } | null>> {
    try {
      const { email, password } = userSignInRequest;

      if (email === '' || password === '') {
        return new CustomResponse(null, new CustomError('Invalid credentials', 400));
      }

      const existingUser = await this.userRepository.findOne({ where: { email } });

      if (existingUser === null || existingUser.passwordHash !== hashPassword(password)) {
        return new CustomResponse(null, new CustomError('Invalid credentials', 400));
      }

      const token = createJWTToken(existingUser.id);
      return new CustomResponse({ token }, null);
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Get('signout')
  public async signOut(): Promise<CustomResponse<string | null>> {
    try {
      return new CustomResponse('Signout Success', null);
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }
}
