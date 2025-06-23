import { EmergencyUnitService } from './emergency-unit.service';
import { CreateEmergencyUnitDto } from './dto/create-emergency-unit.dto';
import { UpdateEmergencyUnitDto } from './dto/update-emergency-unit.dto';
import { EmergencyUnitListDto } from './dto/emergency-unit-list.dto';
export declare class EmergencyUnitController {
    private readonly emergencyUnitService;
    constructor(emergencyUnitService: EmergencyUnitService);
    findAll(): Promise<EmergencyUnitListDto[]>;
    create(createEmergencyUnitDto: CreateEmergencyUnitDto): void;
    findOne(id: string): Promise<import("./entities/emergency-unit.entity").EmergencyUnit>;
    update(id: string, updateEmergencyUnitDto: UpdateEmergencyUnitDto): void;
    remove(id: string): void;
}
