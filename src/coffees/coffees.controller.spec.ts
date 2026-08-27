import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './entities/coffee.entity.js';
import { Flavor } from './entities/flavor.entity.js';

describe('CoffeesController', () => {
  let controller: CoffeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeesController],
      providers: [
        CoffeesService,
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
      ],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
