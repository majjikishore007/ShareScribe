import { Note } from '../models/notes';
import { CustomError, CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';
import { Body, Controller, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../config/database/ormconfig';

export interface NoteCreationReq {
  title: string;
  content: string;
}

export interface NotesRes {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Route('notes')
@Tags('Notes')
export class NotesController extends Controller {
  private readonly notesRepository = AppDataSource.getRepository(Note);

  @Post('create/{userId}')
  public async createNote(
    @Path() userId: number,
    @Body() noteCreationReq: NoteCreationReq
  ): Promise<CustomResponse<NotesRes | null>> {
    try {
      const data = await this.notesRepository.save({ ...noteCreationReq, userId });
      if (data !== null) {
        return new CustomResponse(data, null);
      } else {
        return new CustomResponse(null, new CustomError('Note not created', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Get('{userId}/{noteId}')
  public async getNoteById(@Path() noteId: number, @Path() userId: number): Promise<CustomResponse<NotesRes | null>> {
    try {
      const data = await this.notesRepository.findOne({ where: { id: noteId, userId } });
      if (data !== null) {
        return new CustomResponse(data, null);
      } else {
        return new CustomResponse(null, new CustomError('Note not found', 404));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }
}
