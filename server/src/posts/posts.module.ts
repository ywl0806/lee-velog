import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { postProviders } from './post.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...postProviders],
})
export class PostsModule {}
