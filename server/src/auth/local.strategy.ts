import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Local_Strategy } from 'passport-local';
import { CredentialsDto } from 'src/user/dto/credentials.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local_Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const userCred: CredentialsDto = { username, password };
    const user = await this.authService.validateUser(userCred);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
