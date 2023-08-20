import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AtGuard } from '../common/guards';
import { AtStrategy, RtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    // first way to add dependency injection for reflector that checks for 'isPublic' metadata
    // second way: check in main.ts
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AuthModule {}
