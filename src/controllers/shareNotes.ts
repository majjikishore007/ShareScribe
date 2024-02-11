import { Body, Controller, Path, Post, Put, Route, Tags } from 'tsoa';
import { AppDataSource } from '../config/database/ormconfig';
import { SharedNote, type Permission } from '../models/sharedNotes';
import { CustomError, CustomResponse } from '../types';
import { handleErrors } from '../utils/utils';

export interface ShareNoteReq {
  noteId: number;
  toUserId: number;
  permission: Permission;
}
export interface UpdatePermissionReq {
  noteId: number;
  toUserId: number;
  permission: Permission;
}
export interface RemovePermissionReq {
  noteId: number;
  toUserId: number;
}
@Route('notes')
@Tags('ShareNotes')
export class SharedNoteController extends Controller {
  private readonly shareNoteRepository = AppDataSource.getRepository(SharedNote);

  @Post('share/{userId}')
  public async shareNote(
    @Path() userId: number,
    @Body() noteCreationReq: ShareNoteReq
  ): Promise<CustomResponse<string | null>> {
    try {
      console.log('notes creation req', noteCreationReq);
      const { noteId, toUserId, permission } = noteCreationReq;
      const data = await this.shareNoteRepository.save({ byUser: userId, toUser: toUserId, note: noteId, permission });
      if (data !== null) {
        return new CustomResponse('Note shared successfully', null);
      } else {
        return new CustomResponse(null, new CustomError('Note not shared', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Put('update-premission/{userId}')
  public async updatePermission(
    @Path() userId: number,
    @Body() updatePermissionReq: UpdatePermissionReq
  ): Promise<CustomResponse<string | null>> {
    try {
      const { noteId, toUserId, permission } = updatePermissionReq;
      const data = await this.shareNoteRepository.update(
        { byUser: userId, toUser: toUserId, note: noteId },
        { permission }
      );
      if (data !== null) {
        return new CustomResponse('Permission updated successfully', null);
      } else {
        return new CustomResponse(null, new CustomError('Permission not updated', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Post('remove-permission/{userId}')
  public async removePermission(
    @Path() userId: number,
    @Body() removePermission: RemovePermissionReq
  ): Promise<CustomResponse<string | null>> {
    try {
      const { noteId, toUserId } = removePermission;
      const data = await this.shareNoteRepository.delete({ byUser: userId, toUser: toUserId, note: noteId });
      if (data !== null) {
        return new CustomResponse('Permission removed successfully', null);
      } else {
        return new CustomResponse(null, new CustomError('Permission not removed', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }
}
