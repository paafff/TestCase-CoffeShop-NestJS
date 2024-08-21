import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cafe } from '@prisma/client';

@Injectable()
export class CafeService {
  constructor(private prisma: PrismaService) {}

  // Create a new cafe
  async createCafe(data: {
    name: string;
    address: string;
    phone: string;
    ownerId?: string;
  }): Promise<Cafe> {
    return this.prisma.cafe.create({
      data,
    });
  }

  // Get all cafes
  async getAllCafes(): Promise<Cafe[]> {
    return this.prisma.cafe.findMany();
  }

  // Get a single cafe by ID
  async getCafeById(id: string): Promise<Cafe | null> {
    return this.prisma.cafe.findUnique({
      where: { id },
    });
  }

  // Update a cafe by ID
  async updateCafe(
    id: string,
    data: { name?: string; address?: string; phone?: string; ownerId?: string },
  ): Promise<Cafe> {
    return this.prisma.cafe.update({
      where: { id },
      data,
    });
  }

  // Delete a cafe by ID
  async deleteCafe(id: string): Promise<Cafe> {
    return this.prisma.cafe.delete({
      where: { id },
    });
  }
}
