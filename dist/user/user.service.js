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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const profile_entity_1 = require("./entities/profile.entity");
const egyptian_nationalid_1 = require("egyptian-nationalid");
const argon2 = require("argon2");
let UserService = class UserService {
    userRepository;
    userProfileRepository;
    dataSource;
    constructor(userRepository, userProfileRepository, dataSource) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.dataSource = dataSource;
    }
    argon2Options = {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
    };
    async create(createUserDto) {
        const { nationalId, phone } = createUserDto;
        const existingUserByNationalId = await this.userRepository.findOneBy({
            nationalId,
        });
        if (existingUserByNationalId)
            throw new common_1.BadRequestException(`User with national id ${nationalId} already exists`);
        const existingUserByPhone = await this.userRepository.findOneBy({
            phone,
        });
        if (existingUserByPhone)
            throw new common_1.BadRequestException(`User with phone number ${phone} already exists`);
        const { birthday, type } = (0, egyptian_nationalid_1.getInformation)(nationalId);
        if (birthday === undefined || type === undefined) {
            throw new common_1.BadRequestException(`Invalid national ID: ${nationalId}. Please provide a valid national ID.`);
        }
        try {
            const { city, address, password, ...userData } = createUserDto;
            const hashedPassword = await this.hashPassword(password);
            const createdUser = await this.dataSource.transaction(async (manager) => {
                const user = this.userRepository.create({
                    ...userData,
                    password: hashedPassword,
                });
                await manager.save(user);
                const userProfile = this.userProfileRepository.create({
                    user,
                    city,
                    address,
                    birthDate: birthday.date,
                    gender: type,
                });
                await manager.save(userProfile);
                user.profile = userProfile;
                return user;
            });
            return createdUser;
        }
        catch (error) {
            console.error('Transaction error details:', error);
            if (error instanceof Error) {
                throw new Error('Error creating user: ' + error.message);
            }
            throw new Error('Error creating user: Unknown error occurred');
        }
    }
    async hashPassword(password) {
        return await argon2.hash(password, this.argon2Options);
    }
    async validatePassword(password, hashedPassword) {
        return await argon2.verify(hashedPassword, password);
    }
    findAll() {
        throw new common_1.NotImplementedException('UserService: findAll is not implemented yet');
    }
    async findOneById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        return user;
    }
    async findOne(nationalId) {
        const user = await this.userRepository.findOneBy({ nationalId });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${nationalId} not found`);
        return user;
    }
    async findByPhone(phone) {
        const user = await this.userRepository.findOneBy({ phone });
        if (!user)
            throw new common_1.NotFoundException(`User with phone ${phone} not found`);
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        this.userRepository.merge(user, updateUserDto);
        if (user.profile) {
            const profileUpdates = {};
            if (updateUserDto.weight !== undefined)
                profileUpdates.weight = updateUserDto.weight;
            if (updateUserDto.height !== undefined)
                profileUpdates.height = updateUserDto.height;
            if (updateUserDto.chronicDiseases !== undefined)
                profileUpdates.chronicDiseases = updateUserDto.chronicDiseases;
            if (updateUserDto.emergencyContacts !== undefined)
                profileUpdates.emergencyContacts = updateUserDto.emergencyContacts;
            if (updateUserDto.address !== undefined)
                profileUpdates.address = updateUserDto.address;
            if (updateUserDto.city !== undefined)
                profileUpdates.city = updateUserDto.city;
            await this.userProfileRepository.update(user.profile.id, profileUpdates);
        }
        await this.userRepository.save(user);
        return this.userRepository.findOne({ where: { id }, relations: ['profile'] });
    }
    remove(nationalId) {
        console.log(`This action removes a #${nationalId} user`);
        throw new common_1.NotImplementedException('UserService: remove is not implemented yet');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(profile_entity_1.UserProfile)),
    __param(2, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], UserService);
//# sourceMappingURL=user.service.js.map