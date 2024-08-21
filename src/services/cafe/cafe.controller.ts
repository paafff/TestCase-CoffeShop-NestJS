import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { Cafe } from '@prisma/client';

@Controller('cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Post()
  async createCafe(
    @Body()
    data: {
      name: string;
      address: string;
      phone: string;
      ownerId?: string;
    },
  ): Promise<Cafe> {
    return this.cafeService.createCafe(data);
  }

  @Get()
  async getAllCafes(): Promise<Cafe[]> {
    return this.cafeService.getAllCafes();
  }

  @Get(':id')
  async getCafeById(@Param('id') id: string): Promise<Cafe | null> {
    return this.cafeService.getCafeById(id);
  }

  @Put(':id')
  async updateCafe(
    @Param('id') id: string,
    @Body()
    data: { name?: string; address?: string; phone?: string; ownerId?: string },
  ): Promise<Cafe> {
    return this.cafeService.updateCafe(id, data);
  }

  @Delete(':id')
  async deleteCafe(@Param('id') id: string): Promise<Cafe> {
    return this.cafeService.deleteCafe(id);
  }
}
