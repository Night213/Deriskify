import { Repository } from 'typeorm';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { Instruction } from './entities/instruction.entity';
import { UUID } from 'node:crypto';
export declare class InstructionService {
    private readonly instructionRepository;
    constructor(instructionRepository: Repository<Instruction>);
    create(createInstructionDto: CreateInstructionDto, emergencyUnitId: number): Promise<Instruction>;
    findAll(): Promise<Instruction[]>;
    findAllByEMU(emergencyUnitId: number): Promise<Instruction[]>;
    findOne(id: UUID): Promise<Instruction>;
    update(id: UUID, updateInstructionDto: UpdateInstructionDto, emergencyUnitId: number): Promise<Instruction>;
    remove(id: UUID, emergencyUnitId: number): Promise<void>;
}
