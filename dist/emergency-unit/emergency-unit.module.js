"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyUnitModule = void 0;
const common_1 = require("@nestjs/common");
const emergency_unit_service_1 = require("./emergency-unit.service");
const emergency_unit_controller_1 = require("./emergency-unit.controller");
const typeorm_1 = require("@nestjs/typeorm");
const emergency_unit_entity_1 = require("./entities/emergency-unit.entity");
let EmergencyUnitModule = class EmergencyUnitModule {
};
exports.EmergencyUnitModule = EmergencyUnitModule;
exports.EmergencyUnitModule = EmergencyUnitModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([emergency_unit_entity_1.EmergencyUnit])],
        controllers: [emergency_unit_controller_1.EmergencyUnitController],
        providers: [emergency_unit_service_1.EmergencyUnitService],
        exports: [emergency_unit_service_1.EmergencyUnitService],
    })
], EmergencyUnitModule);
//# sourceMappingURL=emergency-unit.module.js.map