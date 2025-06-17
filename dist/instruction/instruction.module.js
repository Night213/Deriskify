"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const instruction_service_1 = require("./instruction.service");
const instruction_controller_1 = require("./instruction.controller");
const instruction_entity_1 = require("./entities/instruction.entity");
const jwt_service_1 = require("../lib/services/jwt.service");
const emergency_unit_module_1 = require("../emergency-unit/emergency-unit.module");
const jwt_1 = require("@nestjs/jwt");
let InstructionModule = class InstructionModule {
};
exports.InstructionModule = InstructionModule;
exports.InstructionModule = InstructionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([instruction_entity_1.Instruction]),
            emergency_unit_module_1.EmergencyUnitModule,
            jwt_1.JwtModule,
        ],
        controllers: [instruction_controller_1.InstructionController],
        providers: [instruction_service_1.InstructionService, jwt_service_1.JwtAuthService],
        exports: [instruction_service_1.InstructionService],
    })
], InstructionModule);
//# sourceMappingURL=instruction.module.js.map