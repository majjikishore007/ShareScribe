import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, Tags } from 'tsoa';
import { Brackets } from 'typeorm';
import { AppDataSource } from '../config/database/ormconfig';
import { Note } from '../models/notes';
import { Permission, SharedNote } from '../models/sharedNotes';
import { CustomError, CustomResponse } from '../types';
import { handleErrors, transformNotesData } from '../utils/utils';

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
@Route('note')
@Tags('Notes')
export class NotesController extends Controller {
  private readonly notesRepository = AppDataSource.getRepository(Note);
  private readonly shareNoteRepository = AppDataSource.getRepository(SharedNote);

  @Post('create/{userId}')
  @Security('jwt')
  public async createNote(
    @Path() userId: number,
    @Body() noteCreationReq: NoteCreationReq
  ): Promise<CustomResponse<string | null>> {
    try {
      const newNote = new Note();
      Object.assign(newNote, noteCreationReq);
      newNote.user = userId;

      const newSharedNote = new SharedNote();
      newSharedNote.byUser = userId;
      newSharedNote.toUser = userId;
      newSharedNote.permission = Permission.Owner;

      await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const savedNote = await transactionalEntityManager.save(newNote);
        newSharedNote.note = savedNote.id;
        await transactionalEntityManager.save(newSharedNote);
      });
      return new CustomResponse('Notes created successfully', null);
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Get('{userId}/{noteId}')
  @Security('jwt')
  public async getNoteById(@Path() noteId: number, userId: number): Promise<CustomResponse<NotesRes | null>> {
    try {
      const data = await this.shareNoteRepository
        .createQueryBuilder('shareNote')
        .select([
          'note.id',
          'note.userId',
          'note.title',
          'note.content',
          'shareNote.permission',
          'note.createdAt',
          'note.updatedAt'
        ])
        .leftJoinAndSelect('shareNote.note', 'note')
        .where('note.id = :noteId', { noteId })
        .andWhere(
          new Brackets((qb) => {
            qb.where('note.userId = :userId', { userId }).orWhere('shareNote.toUserId = :userId', { userId });
          })
        )
        .getOne();
      console.log('data', data);
      if (data !== null) {
        const notes = transformNotesData(data);
        return new CustomResponse(notes, null);
      } else {
        return new CustomResponse(null, new CustomError('Note with id:' + noteId + ' does not exist', 404));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Get('{userId}/all')
  @Security('jwt')
  public async getAllNotes(@Path() userId: number): Promise<CustomResponse<SharedNote[] | null>> {
    try {
      const data = await this.shareNoteRepository
        .createQueryBuilder('sharedNote')
        .leftJoinAndSelect('sharedNote.note', 'note')
        .where('sharedNote.toUser = :userId', { userId })
        .getMany();

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
  @Security('jwt')
  public async updateNote(
    @Path() userId: number,
    @Path() noteId: number,
    @Body() noteCreationReq: NoteCreationReq
  ): Promise<CustomResponse<string | null>> {
    try {
      await this.notesRepository.update({ id: noteId, user: userId, updatedAt: new Date() }, noteCreationReq);
      return new CustomResponse('Upddate successfully', null);
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Delete('{userId}/{noteId}')
  @Security('jwt')
  public async deleteNoteById(@Path() userId: number, @Path() noteId: number): Promise<CustomResponse<string | null>> {
    try {
      await this.notesRepository.delete({ id: noteId, user: userId });
      return new CustomResponse('Notes got deleted successfully', null);
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }
}
