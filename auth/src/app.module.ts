import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RateLimitterModule } from './rate-limitter/rate-limitter.module';

@Module({
  imports: [AuthModule, RateLimitterModule],
})
export class AppModule {}
