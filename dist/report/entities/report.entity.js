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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const emergency_unit_entity_1 = require("../../emergency-unit/entities/emergency-unit.entity");
const report_enums_1 = require("../../shared/enums/report.enums");
let Report = class Report {
    id;
    _id;
    description;
    images;
    coordinates;
    priority;
    user;
    emergencyUnit;
    createdAt;
    updatedAt;
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Generated)('uuid'),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Report.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], Report.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)('geometry', { spatialFeatureType: 'Point', srid: 4326 }),
    __metadata("design:type", Object)
], Report.prototype, "coordinates", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: report_enums_1.ReportPriority,
        default: report_enums_1.ReportPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], Report.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Report.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => emergency_unit_entity_1.EmergencyUnit, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", emergency_unit_entity_1.EmergencyUnit)
], Report.prototype, "emergencyUnit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Report.prototype, "updatedAt", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)()
], Report);
//# sourceMappingURL=report.entity.js.map