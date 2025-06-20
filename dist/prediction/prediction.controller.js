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
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PredictionController = class PredictionController {
    predictionService;
    constructor(predictionService) {
        this.predictionService = predictionService;
    }
    async predict(file, body, req) {
        if (!file) {
            throw new common_1.BadRequestException('Image file is required');
        }
        if (!body.category) {
            throw new common_1.BadRequestException('Category is required');
        }
        return this.predictionService.predictAndSave(file, body.category, req.user);
    }
    async getMyPredictions(req) {
        return this.predictionService.findByUser(req.user.id);
    }
    async getAllPredictions() {
        return this.predictionService.findAll();
    }
};
exports.PredictionController = PredictionController;
__decorate([
    (0, common_1.Post)('predict'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
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
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getMyPredictions", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getAllPredictions", null);
exports.PredictionController = PredictionController = __decorate([
    (0, common_1.Controller)('prediction'),
    __metadata("design:paramtypes", [prediction_service_1.PredictionService])
], PredictionController);
//# sourceMappingURL=prediction.controller.js.map