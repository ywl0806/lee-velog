import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './post.provider';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [...postProviders, PostsResolver],
})
export class PostsModule {}
