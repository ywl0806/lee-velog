import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './post.providers';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule],
  providers: [...postProviders, PostResolver, PostService],
})
export class PostModule {}
