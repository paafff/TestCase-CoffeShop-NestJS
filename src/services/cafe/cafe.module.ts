import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CafeController } from './cafe.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [CafeController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class CafeModule {}
