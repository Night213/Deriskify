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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveReportDto = void 0;
const class_transformer_1 = require("class-transformer");
const report_enums_1 = require("../../shared/enums/report.enums");
const emergency_unit_list_dto_1 = require("../../emergency-unit/dto/emergency-unit-list.dto");
const retrieve_user_dto_1 = require("../../user/dto/retrieve-user.dto");
class RetrieveReportDto {
    id;
    description;
    images;
    priority;
    user;
    emergencyUnit;
    coordinates;
    createdAt;
    updatedAt;
}
exports.RetrieveReportDto = RetrieveReportDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj._id),
    __metadata("design:type", String)
], RetrieveReportDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RetrieveReportDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], RetrieveReportDto.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RetrieveReportDto.prototype, "priority", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => retrieve_user_dto_1.RetrieveUserDto),
    __metadata("design:type", retrieve_user_dto_1.RetrieveUserDto)
], RetrieveReportDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => emergency_unit_list_dto_1.EmergencyUnitListDto),
    __metadata("design:type", emergency_unit_list_dto_1.EmergencyUnitListDto)
], RetrieveReportDto.prototype, "emergencyUnit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ obj, }) => [obj.coordinates.coordinates[0], obj.coordinates.coordinates[1]]),
    __metadata("design:type", Array)
], RetrieveReportDto.prototype, "coordinates", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], RetrieveReportDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], RetrieveReportDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=retrieve-report.dto.js.map