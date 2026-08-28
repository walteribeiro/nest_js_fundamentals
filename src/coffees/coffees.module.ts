import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './entities/coffee.entity.js';
import { Flavor } from './entities/flavor.entity.js';
import { Event } from '../events/entities/event.entity.js';
import {
  COFFEE_BRANDS,
  COFFEE_BRANDS_ASYNC,
  COFFEE_BRANDS_FACTORY,
  COFFEE_BRANDS_FACTORY_PROVIDER,
} from './coffees.constants.js';
import { DataSource } from 'typeorm';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactoryProvider {
  create() {
    return ['buddy brew factory provider', 'nescafe factory provider'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['buddy brew', 'nescafe'],
    },
    {
      provide: COFFEE_BRANDS_FACTORY,
      useFactory: () => ['buddy brew factory', 'nescafe factory'],
    },
    CoffeeBrandsFactoryProvider,
    {
      provide: COFFEE_BRANDS_FACTORY_PROVIDER,
      inject: [CoffeeBrandsFactoryProvider],
      useFactory: (factoryProvider: CoffeeBrandsFactoryProvider) =>
        factoryProvider.create(),
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      provide: COFFEE_BRANDS_ASYNC,
      useFactory: async (datasource: DataSource): Promise<string[]> => {
        console.log(`Database initialized? ${datasource.isInitialized}`);
        const coffeeBrands = await Promise.resolve([
          'buddy brew async',
          'nescafe async',
        ]);
        return coffeeBrands;
      },
      inject: [DataSource],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
