import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { Tokens } from './types';
import { loginDto, registerDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: loginDto): Promise<Tokens> {
    try {
      const response = await this.authService.login(dto);

      return response;
    } catch (error) {
      throw new BadRequestException('Unexpected error');
    }
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: registerDto): Promise<Tokens> {
    try {
      const response = await this.authService.register(dto);

      return response;
    } catch (error) {
      throw new BadRequestException('Unexpected error');
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    try {
      return await this.authService.logout(userId);
    } catch (error) {
      throw new BadRequestException('Unexpected error');
    }
  }

  @Public() // bypass AtGuard first
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ) {
    try {
      return await this.authService.refreshTokens(userId, refreshToken);
    } catch (error) {
      throw new BadRequestException('Unexpected error');
    }
  }
}
