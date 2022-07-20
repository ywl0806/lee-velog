import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PoliciesGuard } from './guards/policies.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
