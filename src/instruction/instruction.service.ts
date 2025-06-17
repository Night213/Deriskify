import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { Instruction } from './entities/instruction.entity';
import { UUID } from 'node:crypto';

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(Instruction)
    private readonly instructionRepository: Repository<Instruction>,
  ) {}

  async create(
    createInstructionDto: CreateInstructionDto,
    emergencyUnitId: number,
  ): Promise<Instruction> {
    const instruction = this.instructionRepository.create({
      ...createInstructionDto,
      emergencyUnitId,
    });
    return await this.instructionRepository.save(instruction);
  }

  async findAll(): Promise<Instruction[]> {
    return await this.instructionRepository.find({
      relations: ['emergencyUnit'],
    });
  }

  async findAllByEMU(emergencyUnitId: number): Promise<Instruction[]> {
    return await this.instructionRepository.find({
      where: { emergencyUnitId },
      relations: ['emergencyUnit'],
    });
  }

  async findOne(id: UUID): Promise<Instruction> {
    const instruction = await this.instructionRepository.findOne({
      where: { _id: id },
      relations: ['emergencyUnit'],
    });

    if (!instruction) {
      throw new NotFoundException(`Instruction with ID ${id} not found`);
    }

    return instruction;
  }

  async update(
    id: UUID,
    updateInstructionDto: UpdateInstructionDto,
    emergencyUnitId: number,
  ): Promise<Instruction> {
    const instruction = await this.instructionRepository.findOne({
      where: { _id: id, emergencyUnitId },
    });

    if (!instruction) {
      throw new NotFoundException(
        `Instruction with ID ${id} not found or you don't have permission to update it`,
      );
    }

    await this.instructionRepository.update(
      instruction.id,
      updateInstructionDto,
    );
    return await this.findOne(id);
  }

  async remove(id: UUID, emergencyUnitId: number): Promise<void> {
    const instruction = await this.instructionRepository.findOne({
      where: { _id: id, emergencyUnitId },
    });

    if (!instruction) {
      throw new NotFoundException(
        `Instruction with ID ${id} not found or you don't have permission to delete it`,
      );
    }

    await this.instructionRepository.remove(instruction);
  }
}
