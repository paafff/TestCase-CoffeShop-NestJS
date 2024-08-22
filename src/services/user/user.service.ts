import { Injectable } from '@nestjs/common';

import { GenderEnum, Prisma, RoleEnum, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createOne(userCreateArgs: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userCreateArgs.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        ...userCreateArgs,
        password: hashedPassword,
      },
    });

    if (createdUser.role === 'MANAGER') {
      await this.prisma.manager.create({
        data: {
          id: createdUser.id,
        },
      });
    }
    if (createdUser.role === 'OWNER') {
      await this.prisma.owner.create({
        data: {
          id: createdUser.id,
        },
      });
    }

    return createdUser;
  }

  async findMany() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        manager: {
          include: {
            cafe: true,
          },
        },
        owner: {
          include: {
            cafe: true,
          },
        },
      },
    });
  }

  // Update a user by ID
  async updateOne(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
