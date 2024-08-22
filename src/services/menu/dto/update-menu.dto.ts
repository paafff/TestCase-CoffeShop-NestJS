import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Espresso',
    description: 'Name of the menu item',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 2.5,
    description: 'Price of the menu item',
    required: false,
  })
  price?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Indicates if the menu item is recommended',
    required: false,
  })
  isRecommended?: boolean;
}