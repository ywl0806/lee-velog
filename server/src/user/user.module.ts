import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
