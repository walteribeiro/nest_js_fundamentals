import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './entities/coffee.entity.js';
import { Flavor } from './entities/flavor.entity.js';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
