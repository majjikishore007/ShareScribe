import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  byuser: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  toUser: User;

  @ManyToOne(() => Note, (note) => note.id, { nullable: false })
  note: Note;

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
