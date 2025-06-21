import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/profile.entity';
import { getInformation } from 'egyptian-nationalid';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  private readonly argon2Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  };

  async create(createUserDto: CreateUserDto) {
    const { nationalId, phone } = createUserDto;

    // Check if the national ID already exists
    const existingUserByNationalId = await this.userRepository.findOneBy({
      nationalId,
    });
    if (existingUserByNationalId)
      throw new BadRequestException(
        `User with national id ${nationalId} already exists`,
      );

    // Check if the phone number already exists
    const existingUserByPhone = await this.userRepository.findOneBy({
      phone,
    });
    if (existingUserByPhone)
      throw new BadRequestException(
        `User with phone number ${phone} already exists`,
      );

    // Extract information from the national ID
    const { birthday, type } = getInformation(nationalId);

    if (birthday === undefined || type === undefined) {
      throw new BadRequestException(
        `Invalid national ID: ${nationalId}. Please provide a valid national ID.`,
      );
    }

    try {
      const { city, address, password, ...userData } = createUserDto;

      // Hash the password
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

        // Attach the profile to the user
        user.profile = userProfile;
        return user;
      });

      return createdUser;
    } catch (error: unknown) {
      console.error('Transaction error details:', error);
      if (error instanceof Error) {
        throw new Error('Error creating user: ' + error.message);
      }
      throw new Error('Error creating user: Unknown error occurred');
    }
  }

  async hashPassword(password: string) {
    return await argon2.hash(password, this.argon2Options);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }

  findAll() {
    throw new NotImplementedException(
      'UserService: findAll is not implemented yet',
    );
  }
  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
  async findOne(nationalId: string) {
    const user = await this.userRepository.findOneBy({ nationalId });
    if (!user)
      throw new NotFoundException(`User with id ${nationalId} not found`);
    return user;
  }

  async findByPhone(phone: string) {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user)
      throw new NotFoundException(`User with phone ${phone} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    // Update user fields
    this.userRepository.merge(user, updateUserDto);

    // Update profile fields if present
    if (user.profile) {
      const profileUpdates: Partial<UserProfile> = {};
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
    // Reload user with updated profile
    return this.userRepository.findOne({ where: { id }, relations: ['profile'] });
  }
  remove(nationalId: string) {
    console.log(`This action removes a #${nationalId} user`);
    throw new NotImplementedException(
      'UserService: remove is not implemented yet',
    );
  }
}
