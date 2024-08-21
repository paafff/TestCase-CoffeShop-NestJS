import { Module } from '@nestjs/common';
import { InitializationModule } from './services/initialization/initialization.module';


@Module({
  imports: [InitializationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
