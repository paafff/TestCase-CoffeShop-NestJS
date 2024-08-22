import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, RoleEnum } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the user account',
    minLength: 6,
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  fullName: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username for the user account',
  })
  username: string;

  @IsOptional()
  @ApiProperty({
    example: GenderEnum.MALE,
    description: 'Gender of the user',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @IsOptional()
  @ApiProperty({
    example: RoleEnum.MANAGER,
    description: 'Role of the user in the system',
    enum: RoleEnum,
  })
  role: RoleEnum;
}
