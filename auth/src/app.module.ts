import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RateLimitterModule } from './rate-limitter/rate-limitter.module';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [AuthModule, RateLimitterModule, ApiGatewayModule],
})
export class AppModule {}
