import { CreateEmergencyUnitDto } from './dto/create-emergency-unit.dto';
import { UpdateEmergencyUnitDto } from './dto/update-emergency-unit.dto';
import { EmergencyUnit } from './entities/emergency-unit.entity';
import { Repository } from 'typeorm';
export declare class EmergencyUnitService {
    private readonly emergencyUnitRepository;
    constructor(emergencyUnitRepository: Repository<EmergencyUnit>);
    private readonly argon2Options;
    create(createEmergencyUnitDto: CreateEmergencyUnitDto): void;
    findAll(): Promise<{
        numericId: number;
        id: number;
        _id: import("crypto").UUID;
        username: string;
        name: string;
        phone: string;
        password: string;
        email: string;
        website: string;
        description: string;
        icon: string;
        stations: import("../shared/types/user.types").EmergencyUnitStation[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<EmergencyUnit>;
    findByUsername(username: string): Promise<EmergencyUnit>;
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    update(id: number, updateEmergencyUnitDto: UpdateEmergencyUnitDto): void;
    remove(id: number): void;
}
