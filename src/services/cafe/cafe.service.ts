import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cafe, RoleEnum } from '@prisma/client';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Injectable()
export class CafeService {
  constructor(private prisma: PrismaService) {}

  // Create a new cafe
  async createCafe(data: CreateCafeDto): Promise<Cafe> {
    const owner = await this.prisma.owner.findUnique({
      where: { id: data.ownerId },
    });

    if (!owner) {
      throw new NotFoundException('Owner not found or invalid role');
    }

    return this.prisma.cafe.create({
      data,
    });
  }

  // Get all cafes
  async getAllCafes(): Promise<Cafe[]> {
    return this.prisma.cafe.findMany({
      include: {
        owner: true,
        manager: true,
        menu: true,
      },
    });
  }

  // Get a single cafe by ID
  async getCafeById(id: string): Promise<Cafe | null> {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: {
        owner: true,
        manager: true,
        menu: true,
      },
    });

    if (!cafe) {
      throw new NotFoundException(`Cafe with ID ${id} not found`);
    }

    return cafe;
  }

  // Update a cafe by ID
  async updateCafe(id: string, data: UpdateCafeDto, user: any): Promise<Cafe> {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: {
        manager: true,
        menu: true,
      },
    });

    if (!cafe) {
      throw new NotFoundException(`Cafe with ID ${id} not found`);
    }

    if (
      (user.role !== RoleEnum.OWNER && cafe.ownerId !== user.id) ||
      (user.role !== RoleEnum.MANAGER &&
        cafe.manager.map((manager) => manager.id).includes(user.id))
    ) {
      throw new ForbiddenException('You are not allowed to update this cafe');
    }

    return this.prisma.cafe.update({
      where: { id },
      data,
    });
  }

  // Delete a cafe by ID
  async deleteCafe(id: string, user: any): Promise<Cafe> {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
    });

    if (!cafe) {
      throw new NotFoundException(`Cafe with ID ${id} not found`);
    }

    if (user.role !== RoleEnum.OWNER && cafe.ownerId !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this cafe');
    }

    return this.prisma.cafe.delete({
      where: { id },
    });
  }
}