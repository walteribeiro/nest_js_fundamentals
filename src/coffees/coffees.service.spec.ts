import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './entities/coffee.entity.js';
import { Event } from '../events/entities/event.entity.js';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: getModelToken(Coffee.name), useValue: {} },
        { provide: getModelToken(Event.name), useValue: {} },
        { provide: getConnectionToken(), useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
