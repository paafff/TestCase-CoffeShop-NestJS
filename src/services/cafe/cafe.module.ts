import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';

@Module({
  controllers: [CafeController],
  providers: [CafeService],
  imports: [PrismaModule],
  exports: [CafeService],
})
export class CafeModule {}
