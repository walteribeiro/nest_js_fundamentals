import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './entities/coffee.entity.js';
import { Flavor } from './entities/flavor.entity.js';
import {
  COFFEE_BRANDS,
  COFFEE_BRANDS_ASYNC,
  COFFEE_BRANDS_FACTORY,
  COFFEE_BRANDS_FACTORY_PROVIDER,
} from './coffees.constants.js';
import { Mock } from 'vitest';

type MockRepository<T extends object = any> = Partial<
  Record<keyof Repository<T>, Mock>
>;
const createMockRepository = <T extends object = any>(): MockRepository<T> => ({
  findOne: vi.fn(),
  create: vi.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        { provide: DataSource, useValue: {} },
        { provide: COFFEE_BRANDS, useValue: [] },
        { provide: COFFEE_BRANDS_FACTORY, useValue: [] },
        { provide: COFFEE_BRANDS_FACTORY_PROVIDER, useValue: [] },
        { provide: COFFEE_BRANDS_ASYNC, useValue: [] },
        { provide: ConfigService, useValue: { get: vi.fn() } },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = 1;
        const expectedCoffee = {};

        coffeeRepository.findOne!.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = 1;
        coffeeRepository.findOne!.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy(); // we should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect((err as NotFoundException).message).toEqual(
            `Coffee #${coffeeId} not found`,
          );
        }
      });
    });
  });
});
