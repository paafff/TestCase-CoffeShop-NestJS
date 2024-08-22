import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [PrismaModule],
  exports: [MenuService],
})
export class MenuModule {}
