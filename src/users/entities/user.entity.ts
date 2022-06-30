import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { IUser } from '../interface/user.interface';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: true })
  lastName: string;

  @IsEmail()
  @Column({ name: 'email', length: 100 })
  email: string;

  @Column({ type: 'varchar', name: 'mobile_number', length: 20 })
  mobileNumber: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;

  // 0 = INACTIVE , 1 = ACTIVE
  @Column({ type: 'integer', name: 'status', default: 1 })
  status: number;
}
