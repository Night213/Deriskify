import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/shared/types/auth.types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'User created successfully',
      statusCode: 201,
      user: plainToInstance(RetrieveUserDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    return {
      message: 'User retrieved successfully',
      statusCode: 200,
      user: plainToInstance(RetrieveUserDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.id;
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');
    const updatedUser = await this.userService.update(userId, updateUserDto);
    return {
      message: 'User updated successfully',
      statusCode: 200,
      user: plainToInstance(RetrieveUserDto, updatedUser, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
