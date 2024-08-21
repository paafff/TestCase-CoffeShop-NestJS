import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitializationService } from './services/initialization/initialization.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environment = process.env.NODE_ENV;
  const port = process.env.APP_PORT;

  const initializationService = app.get(InitializationService);
  try {
    await initializationService.initialize();
  } catch (error) {
    console.error('Initialization failed:', error);
  }

  await app.listen(port || 3000);
  console.log(`backend is running in ${environment} mode on port ${port}`);
}
bootstrap();
