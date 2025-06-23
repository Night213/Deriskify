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
exports.InstructionController = void 0;
const common_1 = require("@nestjs/common");
const instruction_service_1 = require("./instruction.service");
const create_instruction_dto_1 = require("./dto/create-instruction.dto");
const update_instruction_dto_1 = require("./dto/update-instruction.dto");
const retrieve_instruction_dto_1 = require("./dto/retrieve-instruction.dto");
const emu_auth_guard_1 = require("../auth/guards/emu-auth.guard");
const class_transformer_1 = require("class-transformer");
let InstructionController = class InstructionController {
    instructionService;
    constructor(instructionService) {
        this.instructionService = instructionService;
    }
    async create(createInstructionDto, req) {
        const instruction = await this.instructionService.create(createInstructionDto, req.emu.id);
        return (0, class_transformer_1.plainToInstance)(retrieve_instruction_dto_1.RetrieveInstructionDto, instruction, {
            excludeExtraneousValues: true,
        });
    }
    async findAll() {
        const instructions = await this.instructionService.findAll();
        const data = instructions.map((instruction) => (0, class_transformer_1.plainToInstance)(retrieve_instruction_dto_1.RetrieveInstructionDto, instruction, {
            excludeExtraneousValues: true,
        }));
        return data;
    }
    async findAllForEMU(req) {
        const instructions = await this.instructionService.findAllByEMU(req.emu.id);
        const data = instructions.map((instruction) => (0, class_transformer_1.plainToInstance)(retrieve_instruction_dto_1.RetrieveInstructionDto, instruction, {
            excludeExtraneousValues: true,
        }));
        return data;
    }
    async findOne(id) {
        const instruction = await this.instructionService.findOne(id);
        return (0, class_transformer_1.plainToInstance)(retrieve_instruction_dto_1.RetrieveInstructionDto, instruction, {
            excludeExtraneousValues: true,
        });
    }
    async update(id, updateInstructionDto, req) {
        const updatedInstruction = await this.instructionService.update(id, updateInstructionDto, req.emu.id);
        return (0, class_transformer_1.plainToInstance)(retrieve_instruction_dto_1.RetrieveInstructionDto, updatedInstruction, {
            excludeExtraneousValues: true,
        });
    }
    remove(id, req) {
        return this.instructionService.remove(id, req.emu.id);
    }
};
exports.InstructionController = InstructionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instruction_dto_1.CreateInstructionDto, Object]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('emu'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "findAllForEMU", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_instruction_dto_1.UpdateInstructionDto, Object]),
    __metadata("design:returntype", Promise)
], InstructionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(emu_auth_guard_1.EMUAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InstructionController.prototype, "remove", null);
exports.InstructionController = InstructionController = __decorate([
    (0, common_1.Controller)('instructions'),
    __metadata("design:paramtypes", [instruction_service_1.InstructionService])
], InstructionController);
//# sourceMappingURL=instruction.controller.js.map