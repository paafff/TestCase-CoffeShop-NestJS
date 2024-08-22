import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCafeDto {
  @ApiProperty({
    example: 'Cafe Mocha',
    description: 'Name of the cafe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123 Coffee Street, Espresso City',
    description: 'Address of the cafe',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '+621234567890',
    description: 'Phone number of the cafe',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'owner-id-123',
    description: 'ID of the owner of the cafe',
    required: false,
  })
  @IsOptional()
  @IsString()
  ownerId?: string;
}
