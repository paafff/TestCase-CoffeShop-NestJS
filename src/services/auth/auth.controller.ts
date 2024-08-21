import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { CreateUserDto } from 'src/user/dto/createUserDto';
// import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { Prisma, User } from '@prisma/client';
import { UsersService } from '../user/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('🚀 ~ AuthController ~ login ~ req:', req);
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() userCreateArgs: Prisma.UserCreateArgs['data']) {
    return await this.userService.createOne(userCreateArgs);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    console.log('🚀 ~ AuthController ~ refrshToken ~ req:', req);
    return this.authService.refreshToken(req.user);
  }
}
