import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JWT_Strategy } from 'passport-jwt';
import { UserPayload } from './types/UserPayload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(JWT_Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserPayload> {
    return payload;
  }
}
