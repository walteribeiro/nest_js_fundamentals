import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { Coffee } from './entities/coffee.entity.js';
import { Flavor } from './entities/flavor.entity.js';
import { Event } from '../events/entities/event.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
