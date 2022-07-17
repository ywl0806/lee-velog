/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/entities/post.entity';

@Resolver((_of) => Post)
export class PostsResolver {
  @Query((_returns) => [Post])
  posts() {
    return [];
  }
}
