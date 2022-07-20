import { Module } from '@nestjs/common';
import { PostRepository } from 'src/post/post.repository';
import { databaseProviders } from './database.repository';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
