import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyUnitController } from './emergency-unit.controller';
import { EmergencyUnitService } from './emergency-unit.service';

describe('EmergencyUnitController', () => {
  let controller: EmergencyUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyUnitController],
      providers: [EmergencyUnitService],
    }).compile();

    controller = module.get<EmergencyUnitController>(EmergencyUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
