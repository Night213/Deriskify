import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { EmergencyUnit } from 'src/emergency-unit/entities/emergency-unit.entity';

@Entity('predictions')
export class PredictionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'int' })
  predictedPriority: number;

  @Column({ type: 'varchar', length: 255 })
  imageName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, { eager: false, nullable: false })
  user: User;

  @ManyToOne(() => EmergencyUnit, { nullable: true, eager: false })
  emergencyUnit?: EmergencyUnit;
}
