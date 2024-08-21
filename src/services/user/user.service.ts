import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';

  // }

  async createOne(userCreateArgs: Prisma.UserCreateArgs['data']) {
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

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
