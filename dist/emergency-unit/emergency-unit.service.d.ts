import { CreateEmergencyUnitDto } from './dto/create-emergency-unit.dto';
import { UpdateEmergencyUnitDto } from './dto/update-emergency-unit.dto';
import { EmergencyUnit } from './entities/emergency-unit.entity';
import { Repository } from 'typeorm';
export declare class EmergencyUnitService {
    private readonly emergencyUnitRepository;
    constructor(emergencyUnitRepository: Repository<EmergencyUnit>);
    private readonly argon2Options;
    create(createEmergencyUnitDto: CreateEmergencyUnitDto): void;
    findAll(): Promise<EmergencyUnit[]>;
    findOne(id: number): Promise<EmergencyUnit>;
    findByUsername(username: string): Promise<EmergencyUnit>;
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    update(id: number, updateEmergencyUnitDto: UpdateEmergencyUnitDto): void;
    remove(id: number): void;
}
