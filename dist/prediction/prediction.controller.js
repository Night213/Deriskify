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
exports.PredictionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const prediction_service_1 = require("./prediction.service");
const create_prediction_dto_1 = require("./dto/create-prediction.dto");
const jwt_service_1 = require("../lib/services/jwt.service");
const emergency_unit_service_1 = require("../emergency-unit/emergency-unit.service");
const user_service_1 = require("../user/user.service");
const user_enums_1 = require("../shared/enums/user.enums");
let PredictionController = class PredictionController {
    predictionService;
    jwtAuthService;
    userService;
    emergencyUnitService;
    constructor(predictionService, jwtAuthService, userService, emergencyUnitService) {
        this.predictionService = predictionService;
        this.jwtAuthService = jwtAuthService;
        this.userService = userService;
        this.emergencyUnitService = emergencyUnitService;
    }
    async attachAuthEntity(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.BadRequestException('Missing or invalid Authorization header');
        }
        const token = authHeader.split(' ')[1];
        let decoded = await this.jwtAuthService.decodeToken(token);
        if (decoded && decoded.id) {
            try {
                const user = await this.userService.findOne(decoded.id);
                return { userType: user_enums_1.UserType.CLIENT, entity: user };
            }
            catch { }
        }
        decoded = await this.jwtAuthService.decodeTokenEMU(token);
        if (decoded && decoded.id) {
            try {
                const emu = await this.emergencyUnitService.findOne(decoded.id);
                return { userType: user_enums_1.UserType.EMERGENCY_UNIT, entity: emu };
            }
            catch { }
        }
        throw new common_1.BadRequestException('Invalid or unknown token');
    }
    async predict(file, body, req) {
        if (!file) {
            throw new common_1.BadRequestException('Image file is required');
        }
        if (!body.category || !body.categoryId) {
            throw new common_1.BadRequestException('Category and categoryId are required');
        }
        const { userType, entity } = await this.attachAuthEntity(req);
        const prediction = await this.predictionService.predictAndSave(file, body.category, body.categoryId, { ...entity, userType });
        return {
            predictedPriority: prediction.predictedPriority,
            imageUrl: prediction.imageUrl,
        };
    }
    async getMyPredictions(req) {
        const { userType, entity } = await this.attachAuthEntity(req);
        if (userType === user_enums_1.UserType.CLIENT) {
            const predictions = await this.predictionService.findByUser(entity.id);
            return predictions.map(prediction => ({
                id: prediction.id,
                category: prediction.category,
                predictedPriority: prediction.predictedPriority,
                imageName: prediction.imageName,
                imageUrl: prediction.imageUrl,
                createdAt: prediction.createdAt,
                user: prediction.user,
                categoryId: prediction.categoryId,
            }));
        }
        else if (userType === user_enums_1.UserType.EMERGENCY_UNIT) {
            const predictions = await this.predictionService.findByEmergencyUnit(entity.id);
            return predictions.map(prediction => ({
                id: prediction.id,
                category: prediction.category,
                predictedPriority: prediction.predictedPriority,
                imageName: prediction.imageName,
                imageUrl: prediction.imageUrl,
                createdAt: prediction.createdAt,
                user: prediction.user,
                categoryId: prediction.categoryId,
            }));
        }
        throw new common_1.BadRequestException('Unknown user type');
    }
    async getAllPredictions(req) {
        const { userType, entity } = await this.attachAuthEntity(req);
        if (userType === user_enums_1.UserType.EMERGENCY_UNIT) {
            const predictions = await this.predictionService.findByEmergencyUnitCategory(entity._id);
            return predictions.map(prediction => ({
                id: prediction.id,
                category: prediction.category,
                predictedPriority: prediction.predictedPriority,
                imageName: prediction.imageName,
                imageUrl: prediction.imageUrl,
                createdAt: prediction.createdAt,
                user: prediction.user,
                categoryId: prediction.categoryId,
            }));
        }
        const predictions = await this.predictionService.findAll();
        return predictions.map(prediction => ({
            id: prediction.id,
            category: prediction.category,
            predictedPriority: prediction.predictedPriority,
            imageName: prediction.imageName,
            imageUrl: prediction.imageUrl,
            createdAt: prediction.createdAt,
            user: prediction.user,
            categoryId: prediction.categoryId,
        }));
    }
};
exports.PredictionController = PredictionController;
__decorate([
    (0, common_1.Post)('predict'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_prediction_dto_1.CreatePredictionDto, Object]),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "predict", null);
__decorate([
    (0, common_1.Get)('my-predictions'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getMyPredictions", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getAllPredictions", null);
exports.PredictionController = PredictionController = __decorate([
    (0, common_1.Controller)('prediction'),
    __metadata("design:paramtypes", [prediction_service_1.PredictionService,
        jwt_service_1.JwtAuthService,
        user_service_1.UserService,
        emergency_unit_service_1.EmergencyUnitService])
], PredictionController);
//# sourceMappingURL=prediction.controller.js.map