import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Note } from './notes';
import { User } from './user';

export enum Permission {
  ReadOnly = 'read-only',
  ReadWrite = 'read-write',
  Owner = 'owner'
}

@Entity()
export class SharedNote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  byuserId: number;

  @ManyToOne(() => User, (user) => user.id)
  toUserId: number;

  @ManyToOne(() => Note, (note) => note.id)
  noteId: number;

  @Column({
    type: 'enum',
    enum: Permission,
    default: Permission.ReadOnly
  })
  permission: Permission;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
