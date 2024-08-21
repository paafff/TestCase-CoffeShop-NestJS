import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProducerService } from '../producer/producer.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly producerService: ProducerService,
  ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';

  // }

  async createOne(userCreateArgs: Prisma.UserCreateArgs['data']) {
    const hashedPassword = await bcrypt.hash(userCreateArgs.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        ...userCreateArgs,
        password: hashedPassword,
        userDetail: {
          create: {
            avatarPath: faker.image.avatarGitHub(),
          },
        },
      },
    });

    await this.producerService.sendUserCreatedEvent(createdUser);

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
        userDetail: true,
      },
    });
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
