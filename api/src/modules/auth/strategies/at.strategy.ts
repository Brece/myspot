import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// AccessToken
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // default is set on false
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'at-secret',
    });
  }

  validate(payload: any) {
    return payload;
  }
}
