import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProducerModule } from '../producer/producer.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule,ProducerModule],
  exports: [UsersService],
})
export class UsersModule {}
