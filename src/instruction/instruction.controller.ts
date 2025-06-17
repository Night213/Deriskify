import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InstructionService } from './instruction.service';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { RetrieveInstructionDto } from './dto/retrieve-instruction.dto';
import {
  EMUAuthGuard,
  EMUAuthenticatedRequest,
} from '../auth/guards/emu-auth.guard';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'node:crypto';

@Controller('instructions')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  @Post()
  @UseGuards(EMUAuthGuard)
  async create(
    @Body() createInstructionDto: CreateInstructionDto,
    @Request() req: EMUAuthenticatedRequest,
  ) {
    const instruction = await this.instructionService.create(
      createInstructionDto,
      req.emu.id,
    );
    return plainToInstance(RetrieveInstructionDto, instruction, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const instructions = await this.instructionService.findAll();
    const data = instructions.map((instruction) =>
      plainToInstance(RetrieveInstructionDto, instruction, {
        excludeExtraneousValues: true,
      }),
    );
    return data;
  }

  @Get('emu')
  @UseGuards(EMUAuthGuard)
  async findAllForEMU(@Request() req: EMUAuthenticatedRequest) {
    const instructions = await this.instructionService.findAllByEMU(req.emu.id);
    const data = instructions.map((instruction) =>
      plainToInstance(RetrieveInstructionDto, instruction, {
        excludeExtraneousValues: true,
      }),
    );
    return data;
  }

  @Get(':id')
  @UseGuards(EMUAuthGuard)
  async findOne(@Param('id') id: UUID) {
    const instruction = await this.instructionService.findOne(id);
    return plainToInstance(RetrieveInstructionDto, instruction, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @UseGuards(EMUAuthGuard)
  async update(
    @Param('id') id: UUID,
    @Body() updateInstructionDto: UpdateInstructionDto,
    @Request() req: EMUAuthenticatedRequest,
  ) {
    const updatedInstruction = await this.instructionService.update(
      id,
      updateInstructionDto,
      req.emu.id,
    );
    return plainToInstance(RetrieveInstructionDto, updatedInstruction, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @UseGuards(EMUAuthGuard)
  remove(@Param('id') id: UUID, @Request() req: EMUAuthenticatedRequest) {
    return this.instructionService.remove(id, req.emu.id);
  }
}
