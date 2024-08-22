import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CafeService } from './cafe.service';
import { Cafe } from '@prisma/client';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@ApiTags('cafes')
@Controller('cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new cafe' })
  @ApiResponse({
    status: 201,
    description: 'The cafe has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateCafeDto })
  async createCafe(
    @Body()
    data: CreateCafeDto,
  ): Promise<Cafe> {
    return this.cafeService.createCafe(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cafes' })
  @ApiResponse({ status: 200, description: 'Return all cafes.' })
  async getAllCafes(): Promise<Cafe[]> {
    return this.cafeService.getAllCafes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cafe by ID' })
  @ApiResponse({ status: 200, description: 'Return the cafe.' })
  @ApiResponse({ status: 404, description: 'Cafe not found.' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the cafe' })
  async getCafeById(@Param('id') id: string): Promise<Cafe | null> {
    return this.cafeService.getCafeById(id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a cafe by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cafe has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Cafe not found.' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the cafe' })
  @ApiBody({ type: UpdateCafeDto })
  async updateCafe(
    @Param('id') id: string,
    @Body()
    data: UpdateCafeDto,
    @Request() req: RequestWithUser,
  ): Promise<Cafe> {
    const user = req.user; // Mendapatkan data pengguna dari request
    console.log('User performing the request:', user);
    return this.cafeService.updateCafe(id, data, user);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cafe by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cafe has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Cafe not found.' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the cafe' })
  async deleteCafe(
    @Param('id') id: string,
    @Request() req: RequestWithUser,
  ): Promise<Cafe> {
    const user = req.user; // Mendapatkan data pengguna dari request
    console.log('User performing the request:', user);

    return this.cafeService.deleteCafe(id, user);
  }
}
