import { UUID } from 'crypto';
import { EmergencyUnitStation } from 'src/shared/types/user.types';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EmergencyUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ unique: true })
  _id: UUID;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column({ type: 'json' })
  stations: EmergencyUnitStation[];

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
