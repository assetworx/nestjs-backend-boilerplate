import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ExampleAuthController } from './example-auth/example-auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExampleAuthService } from './example-auth/example-auth.service';

@Module({
  imports: [SharedModule, AuthModule, UsersModule],
  controllers: [ExampleAuthController],
  providers: [
    ExampleAuthService,
  ],
})
export class AppModule {}
