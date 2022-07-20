import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from 'src/user/dto/credentials.dto';
import { UserPayload } from './types/UserPayload.type';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userCred: CredentialsDto): Promise<any> {
    const user = await this.userService.findOne(userCred.username);
    if (user && bcrypt.compare(user.password, userCred.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserPayload) {
    // const payload = {
    //   username: user.username,
    //   id: user.id,
    //   name: user.name,
    //   isAdmin: user.isAdmin,
    // };
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
