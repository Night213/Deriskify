import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyUnitService } from './emergency-unit.service';

describe('EmergencyUnitService', () => {
  let service: EmergencyUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyUnitService],
    }).compile();

    service = module.get<EmergencyUnitService>(EmergencyUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
