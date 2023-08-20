import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Tokens } from './types';
import { User } from '../user/entities/user.entity';
import { loginDto, registerDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: loginDto): Promise<Tokens> {
    try {
      // TODO: make API get request for user information and return the found user object
      const user = await this.userRepository.findOneBy({ email: dto.email });

      if (!user) throw new NotFoundException('User not found');

      const passwordMatches = await bcrypt.compare(
        dto.password,
        user.hashed_password,
      );

      if (!passwordMatches) throw new BadRequestException('Incorrect password');

      const tokens = await this.createJwtTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      console.log('Error while logging in\n\t' + error);
      throw new BadRequestException();
    }
  }

  async logout(userId: number) {
    try {
      /* TODO: lookup user matching the id and hashed_rt !== null in the database and delete (set to null) hashes refresh token

      * for testing in Postman make sure the access_token is not expired

      headers: {
        authorization: `Bearer ${access_token}`
      }
      */
      await this.userRepository.update({ id: userId }, { hashed_rt: '' });
    } catch (error) {
      console.log('Error while logging out\n\t' + error);
      throw new BadRequestException();
    }
  }

  async register(dto: registerDto): Promise<Tokens> {
    try {
      const hash = await this.hashData(dto.password);

      // TODO: connect with CMS/database endpoint and register user, returns user object
      const newUser = this.userRepository.create({
        email: dto.email,
        hashed_password: hash,
        first_name: dto.firstName,
        last_name: dto.lastName,
      });

      await this.userRepository.save(newUser);

      const tokens = await this.createJwtTokens(newUser.id, newUser.email);
      await this.updateRtHash(newUser.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      console.log('Error while registering\n\t' + error);
      throw new BadRequestException();
    }
  }

  async refreshTokens(userId: number, rt: string): Promise<any> {
    try {
      // TODO: get user from database
      /* TODO: lookup user matching the id in the database and update hashed refresh token

      for testing in Postman make sure the refresh_token is not expired

      headers: {
        authorization: `Bearer ${refresh_token}`
      }
      */
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user || !user.hashed_rt)
        throw new NotFoundException('User not found');

      const rtMatches = await bcrypt.compare(rt, user.hashed_rt);

      if (!rtMatches) throw new BadRequestException('Access denied');

      const tokens = await this.createJwtTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      console.log('Error while refreshing\n\t' + error);
      throw new BadRequestException();
    }
  }

  async updateRtHash(userId: number, rt: string) {
    try {
      const hash = await this.hashData(rt);

      // TODO: patch request to CMS/database and update hashed_RT
      await this.userRepository.update({ id: userId }, { hashed_rt: hash });
    } catch (error) {
      console.log('Error while updating hashed refresh token\n\t' + error);
      throw new BadRequestException();
    }
  }

  async createJwtTokens(userId: number, email: string): Promise<Tokens> {
    try {
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: userId,
            email,
          },
          {
            secret: process.env.ACCESS_TOKEN_SECRET || 'at-secret',
            expiresIn: 60 * 15, // 15 minutes
          },
        ),
        this.jwtService.signAsync(
          {
            sub: userId,
            email,
          },
          {
            secret: process.env.REFRESH_TOKEN_SECRET || 'rt-secret',
            expiresIn: 60 * 60 * 24 * 7, // 1 week
          },
        ),
      ]);

      return {
        access_token: at,
        refresh_token: rt,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
