import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { AuthenticatedRequest } from 'src/shared/types/auth.types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        statusCode: number;
        user: RetrieveUserDto;
    }>;
    me(req: AuthenticatedRequest): Promise<{
        message: string;
        statusCode: number;
        user: RetrieveUserDto;
    }>;
    updateMe(req: AuthenticatedRequest, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        statusCode: number;
        user: RetrieveUserDto;
    }>;
    findAll(): void;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    remove(id: string): void;
}
