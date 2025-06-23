"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const instruction_entity_1 = require("./entities/instruction.entity");
let InstructionService = class InstructionService {
    instructionRepository;
    constructor(instructionRepository) {
        this.instructionRepository = instructionRepository;
    }
    async create(createInstructionDto, emergencyUnitId) {
        const instruction = this.instructionRepository.create({
            ...createInstructionDto,
            emergencyUnitId,
        });
        return await this.instructionRepository.save(instruction);
    }
    async findAll() {
        return await this.instructionRepository.find({
            relations: ['emergencyUnit'],
        });
    }
    async findAllByEMU(emergencyUnitId) {
        return await this.instructionRepository.find({
            where: { emergencyUnitId },
            relations: ['emergencyUnit'],
        });
    }
    async findOne(id) {
        const instruction = await this.instructionRepository.findOne({
            where: { _id: id },
            relations: ['emergencyUnit'],
        });
        if (!instruction) {
            throw new common_1.NotFoundException(`Instruction with ID ${id} not found`);
        }
        return instruction;
    }
    async update(id, updateInstructionDto, emergencyUnitId) {
        const instruction = await this.instructionRepository.findOne({
            where: { _id: id, emergencyUnitId },
        });
        if (!instruction) {
            throw new common_1.NotFoundException(`Instruction with ID ${id} not found or you don't have permission to update it`);
        }
        await this.instructionRepository.update(instruction.id, updateInstructionDto);
        return await this.findOne(id);
    }
    async remove(id, emergencyUnitId) {
        const instruction = await this.instructionRepository.findOne({
            where: { _id: id, emergencyUnitId },
        });
        if (!instruction) {
            throw new common_1.NotFoundException(`Instruction with ID ${id} not found or you don't have permission to delete it`);
        }
        await this.instructionRepository.remove(instruction);
    }
};
exports.InstructionService = InstructionService;
exports.InstructionService = InstructionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(instruction_entity_1.Instruction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InstructionService);
//# sourceMappingURL=instruction.service.js.map