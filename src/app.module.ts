import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ExampleAuthController } from './example-auth/example-auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ExampleAuthService } from './example-auth/example-auth.service';
import { PostgresPoolService } from './postgres-pool/postgres-pool.service';
import { AppLoggerService } from './logger/logger.service';

@Module({
  imports: [SharedModule, AuthModule, UsersModule],
  controllers: [ExampleAuthController],
  providers: [
    ExampleAuthService,
    PostgresPoolService,
    AppLoggerService,
  ],
})
export class AppModule {}
