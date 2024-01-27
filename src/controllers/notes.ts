import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import { type UpdateResult } from 'typeorm';
import { AppDataSource } from '../config/database/ormconfig';
import { Note } from '../models/notes';
import { CustomError, CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';
import { type Permission } from '../models/sharedNotes';

export interface NoteCreationReq {
  title: string;
  content: string;
}

export interface NotesRes {
  id: number;
  userId: number;
  title: string;
  content: string;
  permission: Permission;
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
  public async getNoteById(@Path() noteId: number): Promise<CustomResponse<NotesRes | null>> {
    try {
      const data = await this.notesRepository.findOne({ where: { id: noteId } });

      if (data !== null) {
        return new CustomResponse(data, null);
      } else {
        return new CustomResponse(null, new CustomError('Note not found', 404));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Get('{userId}/all')
  public async getAllNotes(@Path() userId: number): Promise<CustomResponse<NotesRes[] | null>> {
    try {
      const data = await this.notesRepository.find({ where: { userId } });
      if (data !== null) {
        return new CustomResponse(data, null);
      } else {
        return new CustomResponse(null, new CustomError('Notes not found', 404));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Put('{userId}/{noteId}')
  public async updateNote(
    @Path() noteId: number,
    @Body() noteCreationReq: NoteCreationReq
  ): Promise<CustomResponse<UpdateResult | null>> {
    try {
      const data = await this.notesRepository.update(noteId, noteCreationReq);

      if (data !== null) {
        console.log('updated notes  ', data);
        return new CustomResponse(data, null);
      } else {
        return new CustomResponse(null, new CustomError('Note not updated', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Delete('{userId}/{noteId}')
  public async deleteNoteById(@Path() noteId: number): Promise<CustomResponse<string | null>> {
    try {
      const data = await this.notesRepository.delete(noteId);
      if (data !== null) {
        return new CustomResponse('Notes got deleted successfully', null);
      } else {
        return new CustomResponse(null, new CustomError('Note not deleted', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }
}
