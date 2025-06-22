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
exports.PredictionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prediction_entity_1 = require("./entities/prediction.entity");
const axios_1 = require("axios");
const FormData = require("form-data");
const config_1 = require("@nestjs/config");
const emergency_unit_service_1 = require("../emergency-unit/emergency-unit.service");
const user_enums_1 = require("../shared/enums/user.enums");
let PredictionService = class PredictionService {
    predictionRepository;
    configService;
    emergencyUnitService;
    modelApiUrl;
    constructor(predictionRepository, configService, emergencyUnitService) {
        this.predictionRepository = predictionRepository;
        this.configService = configService;
        this.emergencyUnitService = emergencyUnitService;
        this.modelApiUrl = this.configService.get('API_MODEL');
    }
    async predictAndSave(file, category, user) {
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, file.originalname);
            formData.append('category', category);
            const response = await axios_1.default.post(this.modelApiUrl, formData, {
                headers: formData.getHeaders(),
            });
            const predictedPriority = response.data?.predicted_priority;
            const imageUrl = response.data?.image_url;
            if (typeof predictedPriority !== 'number' || !imageUrl) {
                throw new Error('Invalid response from prediction model');
            }
            let fullImageUrl = imageUrl;
            if (imageUrl && !imageUrl.startsWith('http')) {
                const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
                const apiBase = this.modelApiUrl.replace(/\/predict-priority.*/, '');
                fullImageUrl = `${apiBase}/${cleanPath}`;
            }
            let emergencyUnit = undefined;
            if (user.userType === user_enums_1.UserType.EMERGENCY_UNIT) {
                emergencyUnit = await this.emergencyUnitService.findOne(user.id);
            }
            const prediction = this.predictionRepository.create({
                category,
                predictedPriority,
                imageName: file.originalname,
                imageUrl: fullImageUrl,
                user,
                emergencyUnit,
            });
            return await this.predictionRepository.save(prediction);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.response?.data?.error || error.message || 'Prediction failed');
        }
    }
    async findByUser(userId) {
        return this.predictionRepository.find({ where: { user: { id: userId } } });
    }
    async findAll() {
        return this.predictionRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['user'],
        });
    }
    async findByEmergencyUnit(emergencyUnitId) {
        return this.predictionRepository.find({ where: { emergencyUnit: { id: emergencyUnitId } }, relations: ['emergencyUnit', 'user'] });
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prediction_entity_1.PredictionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        emergency_unit_service_1.EmergencyUnitService])
], PredictionService);
//# sourceMappingURL=prediction.service.js.map