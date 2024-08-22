import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async findAll() {
    return this.prisma.menu.findMany({
      include: {
        cafe: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        cafe: true,
      },
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto, user: any) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: parseInt(id.toString()) },
      include: {
        cafe: {
          include: {
            manager: true,
          },
        },
      },
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    if (
      menu.cafe.ownerId !== user.id ||
      menu.cafe.manager.map((m) => m.id).includes(user.id)
    ) {
      throw new NotFoundException(
        `You are not authorized to delete this menu item`,
      );
    }
    return this.prisma.menu.update({
      where: { id: parseInt(id.toString()) },
      data: updateMenuDto,
    });
  }

  async remove(id: number, user: any) {
    const menu = await this.prisma.menu.findUnique({
      where: { id: parseInt(id.toString()) },
      include: {
        cafe: {
          include: {
            manager: true,
          },
        },
      },
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    console.log('Menu:', menu);

    if (
      menu.cafe.ownerId !== user.id ||
      menu.cafe.manager.map((m) => m.id).includes(user.id)
    ) {
      throw new NotFoundException(
        `You are not authorized to delete this menu item`,
      );
    }

    return this.prisma.menu.delete({
      where: { id: parseInt(id.toString()) },
    });
  }
}
