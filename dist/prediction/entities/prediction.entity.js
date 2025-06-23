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
exports.PredictionEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const emergency_unit_entity_1 = require("../../emergency-unit/entities/emergency-unit.entity");
let PredictionEntity = class PredictionEntity {
    id;
    category;
    categoryId;
    predictedPriority;
    imageName;
    imageUrl;
    createdAt;
    user;
    emergencyUnit;
};
exports.PredictionEntity = PredictionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PredictionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], PredictionEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], PredictionEntity.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PredictionEntity.prototype, "predictedPriority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], PredictionEntity.prototype, "imageName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], PredictionEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], PredictionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: false, nullable: false }),
    __metadata("design:type", user_entity_1.User)
], PredictionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => emergency_unit_entity_1.EmergencyUnit, { nullable: true, eager: false }),
    __metadata("design:type", emergency_unit_entity_1.EmergencyUnit)
], PredictionEntity.prototype, "emergencyUnit", void 0);
exports.PredictionEntity = PredictionEntity = __decorate([
    (0, typeorm_1.Entity)('predictions')
], PredictionEntity);
//# sourceMappingURL=prediction.entity.js.map