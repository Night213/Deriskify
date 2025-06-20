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
let PredictionService = class PredictionService {
    predictionRepository;
    configService;
    modelApiUrl;
    constructor(predictionRepository, configService) {
        this.predictionRepository = predictionRepository;
        this.configService = configService;
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
            if (typeof predictedPriority !== 'number') {
                throw new Error('Invalid response from prediction model');
            }
            const prediction = this.predictionRepository.create({
                category,
                predictedPriority,
                imageName: file.originalname,
                user,
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
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prediction_entity_1.PredictionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], PredictionService);
//# sourceMappingURL=prediction.service.js.map