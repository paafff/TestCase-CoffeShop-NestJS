import { Module } from '@nestjs/common';
import { InitializationModule } from './services/initialization/initialization.module';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/user/user.module';
import { CafeModule } from './services/cafe/cafe.module';
import { MenuModule } from './services/menu/menu.module';

@Module({
  imports: [
    InitializationModule,
    AuthModule,
    UserModule,
    CafeModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
