import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCafeDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Cafe Mocha',
    description: 'Name of the cafe',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '123 Coffee Street, Espresso City',
    description: 'Address of the cafe',
    required: false,
  })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the cafe',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'owner-id-123',
    description: 'ID of the owner of the cafe',
    required: false,
  })
  ownerId?: string;
}
