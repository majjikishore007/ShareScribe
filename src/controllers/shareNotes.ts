import { type Permission, SharedNote } from '../models/sharedNotes';
import { AppDataSource } from '../config/database/ormconfig';
import { CustomError, CustomResponse } from '../types';
import { Body, Controller, Delete, Path, Post, Put, Route, Tags } from 'tsoa';
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
      const { noteId, toUserId, permission } = noteCreationReq;
      const data = await this.shareNoteRepository.save({ byuserId: userId, noteId, toUserId, permission });
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
      const data = await this.shareNoteRepository.update({ byuserId: userId, noteId, toUserId }, { permission });
      if (data !== null) {
        return new CustomResponse('Permission updated successfully', null);
      } else {
        return new CustomResponse(null, new CustomError('Permission not updated', 500));
      }
    } catch (error) {
      return new CustomResponse(null, handleErrors(error));
    }
  }

  @Delete('remove-permission/{userId}')
  public async removePermission(
    @Path() userId: number,
    @Body() updatePermissionReq: UpdatePermissionReq
  ): Promise<CustomResponse<string | null>> {
    try {
      const { noteId, toUserId } = updatePermissionReq;
      const data = await this.shareNoteRepository.delete({ byuserId: userId, noteId, toUserId });
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
