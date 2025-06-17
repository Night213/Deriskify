import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EmergencyUnit } from '../../emergency-unit/entities/emergency-unit.entity';
import { ReportPriority } from '../../shared/enums/report.enums';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ unique: true })
  _id: UUID;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({
    type: 'enum',
    enum: ReportPriority,
    default: ReportPriority.MEDIUM,
  })
  status: ReportPriority;

  /* -----START-OF-RELATIONS -----*/

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => EmergencyUnit, { eager: true })
  @JoinColumn()
  emergencyUnit: EmergencyUnit;

  /* -----END-OF-RELATIONS -----*/

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
