import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@ApiTags('menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiResponse({
    status: 201,
    description: 'The menu has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateMenuDto })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus' })
  @ApiResponse({ status: 200, description: 'Return all menus.' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID' })
  @ApiResponse({ status: 200, description: 'Return the menu.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the menu' })
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiResponse({
    status: 200,
    description: 'The menu has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the menu' })
  @ApiBody({ type: UpdateMenuDto })
  update(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
    @Request() req: RequestWithUser,
  ) {
    const user = req.user; // Mendapatkan data pengguna dari request
    console.log('User performing the request:', user);
    return this.menuService.update(id, updateMenuDto, user);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiResponse({
    status: 200,
    description: 'The menu has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Menu not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the menu' })
  remove(@Param('id') id: number, @Request() req: RequestWithUser) {
    const user = req.user; // Mendapatkan data pengguna dari request
    console.log('User performing the request:', user);
    return this.menuService.remove(id, user);
  }
}
