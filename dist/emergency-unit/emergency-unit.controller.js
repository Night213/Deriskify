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
exports.EmergencyUnitController = void 0;
const common_1 = require("@nestjs/common");
const emergency_unit_service_1 = require("./emergency-unit.service");
const create_emergency_unit_dto_1 = require("./dto/create-emergency-unit.dto");
const update_emergency_unit_dto_1 = require("./dto/update-emergency-unit.dto");
const emergency_unit_list_dto_1 = require("./dto/emergency-unit-list.dto");
const class_transformer_1 = require("class-transformer");
let EmergencyUnitController = class EmergencyUnitController {
    emergencyUnitService;
    constructor(emergencyUnitService) {
        this.emergencyUnitService = emergencyUnitService;
    }
    async findAll() {
        const emergencyUnits = await this.emergencyUnitService.findAll();
        return (0, class_transformer_1.plainToInstance)(emergency_unit_list_dto_1.EmergencyUnitListDto, emergencyUnits, {
            excludeExtraneousValues: true,
            exposeDefaultValues: true,
        });
    }
    create(createEmergencyUnitDto) {
        return this.emergencyUnitService.create(createEmergencyUnitDto);
    }
    findOne(id) {
        return this.emergencyUnitService.findOne(+id);
    }
    update(id, updateEmergencyUnitDto) {
        return this.emergencyUnitService.update(+id, updateEmergencyUnitDto);
    }
    remove(id) {
        return this.emergencyUnitService.remove(+id);
    }
};
exports.EmergencyUnitController = EmergencyUnitController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmergencyUnitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_emergency_unit_dto_1.CreateEmergencyUnitDto]),
    __metadata("design:returntype", void 0)
], EmergencyUnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmergencyUnitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_emergency_unit_dto_1.UpdateEmergencyUnitDto]),
    __metadata("design:returntype", void 0)
], EmergencyUnitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmergencyUnitController.prototype, "remove", null);
exports.EmergencyUnitController = EmergencyUnitController = __decorate([
    (0, common_1.Controller)('emergency-units'),
    __metadata("design:paramtypes", [emergency_unit_service_1.EmergencyUnitService])
], EmergencyUnitController);
//# sourceMappingURL=emergency-unit.controller.js.map