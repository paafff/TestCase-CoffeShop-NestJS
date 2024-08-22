import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    example: 'Espresso',
    description: 'Name of the menu item',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 2.5,
    description: 'Price of the menu item',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: true,
    description: 'Indicates if the menu item is recommended',
  })
  @IsBoolean()
  isRecommended: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the cafe to which the menu item belongs',
  })
  @IsString()
  cafeId: string;
}
