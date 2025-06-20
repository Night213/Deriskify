"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prediction_service_1 = require("./prediction.service");
const prediction_controller_1 = require("./prediction.controller");
const prediction_entity_1 = require("./entities/prediction.entity");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
let PredictionModule = class PredictionModule {
};
exports.PredictionModule = PredictionModule;
exports.PredictionModule = PredictionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([prediction_entity_1.PredictionEntity]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        controllers: [prediction_controller_1.PredictionController],
        providers: [prediction_service_1.PredictionService],
        exports: [prediction_service_1.PredictionService],
    })
], PredictionModule);
//# sourceMappingURL=prediction.module.js.map