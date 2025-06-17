import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  birthDate: Date;

  @Column({ type: 'enum', enum: ['Male', 'Female'] })
  gender: string;

  @Column({ type: 'smallint', nullable: true })
  weight: number;

  @Column({ type: 'smallint', nullable: true })
  height: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  /* -----START-OF-RELATIONS -----*/

  @OneToOne(() => User, (u) => u.profile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  /* -----END-OF-RELATIONS -----*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
