import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey123',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
