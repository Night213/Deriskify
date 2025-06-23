import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateEmergencyUnitDto } from './dto/create-emergency-unit.dto';
import { UpdateEmergencyUnitDto } from './dto/update-emergency-unit.dto';
import { EmergencyUnit } from './entities/emergency-unit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class EmergencyUnitService {
  constructor(
    @InjectRepository(EmergencyUnit)
    private readonly emergencyUnitRepository: Repository<EmergencyUnit>,
  ) {}

  private readonly argon2Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  };

  create(createEmergencyUnitDto: CreateEmergencyUnitDto) {
    console.log(`This action adds a new emergencyUnit`, createEmergencyUnitDto);
    throw new NotImplementedException(
      'EmergencyUnitService: create is not implemented yet',
    );
  }

  async findAll() {
    const units = await this.emergencyUnitRepository.find({
      select: ['id', '_id', 'name', 'icon'],
      where: { isActive: true },
    });
    // Attach numericId for DTO
    return units.map(unit => ({ ...unit, numericId: unit.id }));
  }

  async findOne(id: number) {
    const emergencyUnit = await this.emergencyUnitRepository.findOneBy({ id });
    if (!emergencyUnit)
      throw new NotFoundException(`EmergencyUnit with id ${id} not found`);
    return emergencyUnit;
  }

  async findByUsername(username: string) {
    const emergencyUnit = await this.emergencyUnitRepository.findOneBy({
      username,
    });
    if (!emergencyUnit)
      throw new NotFoundException(
        `EmergencyUnit with username ${username} not found`,
      );
    return emergencyUnit;
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

  update(id: number, updateEmergencyUnitDto: UpdateEmergencyUnitDto) {
    console.log(
      `This action updates a #${id} emergencyUnit`,
      updateEmergencyUnitDto,
    );
    throw new NotImplementedException(
      'EmergencyUnitService: update is not implemented yet',
    );
  }

  remove(id: number) {
    console.log(`This action removes a #${id} emergencyUnit`);
    throw new NotImplementedException(
      'EmergencyUnitService: remove is not implemented yet',
    );
  }
}
