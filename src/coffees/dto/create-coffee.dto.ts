import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  brand: string;

  @ApiProperty({ description: 'The flavors of a coffee.', type: [String] })
  @IsString({ each: true })
  flavors: string[];
}
