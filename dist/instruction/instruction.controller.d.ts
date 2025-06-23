import { InstructionService } from './instruction.service';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { RetrieveInstructionDto } from './dto/retrieve-instruction.dto';
import { EMUAuthenticatedRequest } from '../auth/guards/emu-auth.guard';
import { UUID } from 'node:crypto';
export declare class InstructionController {
    private readonly instructionService;
    constructor(instructionService: InstructionService);
    create(createInstructionDto: CreateInstructionDto, req: EMUAuthenticatedRequest): Promise<RetrieveInstructionDto>;
    findAll(): Promise<RetrieveInstructionDto[]>;
    findAllForEMU(req: EMUAuthenticatedRequest): Promise<RetrieveInstructionDto[]>;
    findOne(id: UUID): Promise<RetrieveInstructionDto>;
    update(id: UUID, updateInstructionDto: UpdateInstructionDto, req: EMUAuthenticatedRequest): Promise<RetrieveInstructionDto>;
    remove(id: UUID, req: EMUAuthenticatedRequest): Promise<void>;
}
