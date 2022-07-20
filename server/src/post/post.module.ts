import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './post.providers';
import { PostRepository } from './post.repository';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule, CaslModule],
  providers: [...postProviders, PostResolver, PostService, PostRepository],
  exports: [...postProviders],
})
export class PostModule {}
