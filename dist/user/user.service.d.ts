import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/profile.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly userProfileRepository;
    private readonly dataSource;
    constructor(userRepository: Repository<User>, userProfileRepository: Repository<UserProfile>, dataSource: DataSource);
    private readonly argon2Options;
    create(createUserDto: CreateUserDto): Promise<User>;
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
    findAll(): void;
    findOneById(id: number): Promise<User>;
    findOne(nationalId: string): Promise<User>;
    findByPhone(phone: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(nationalId: string): void;
}
