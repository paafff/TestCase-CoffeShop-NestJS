import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [
    AuthService,
    // UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '30s' },
    }),
  ],
})
export class AuthModule {}
