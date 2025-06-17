import { UserType } from '../../shared/enums/user.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserType, default: UserType.CLIENT })
  userType: UserType;

  @Column({ length: 14, unique: true, nullable: false })
  nationalId: string;

  @Column()
  fullName: string;

  @Column({ length: 11, unique: true, nullable: false })
  phone: string;

  @Column({ length: 128, nullable: false })
  password: string;

  /* -----START-OF-RELATIONS -----*/

  @OneToOne(() => UserProfile, (p: UserProfile) => p.user, { eager: true })
  profile: UserProfile;

  /* -----END-OF-RELATIONS -----*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
