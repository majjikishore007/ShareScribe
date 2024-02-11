import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SharedNote } from './sharedNotes';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.toUser)
  sharedNotes: SharedNote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
