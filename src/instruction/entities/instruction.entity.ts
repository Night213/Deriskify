import { UUID } from 'crypto';
import { EmergencyUnit } from '../../emergency-unit/entities/emergency-unit.entity';
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

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ unique: true })
  _id: UUID;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  emergencyUnitId: number;

  @ManyToOne(() => EmergencyUnit, { eager: true })
  @JoinColumn({ name: 'emergencyUnitId' })
  emergencyUnit: EmergencyUnit;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
