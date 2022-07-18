/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/entities/post.entity';
import { PostService } from './post.service';

@Resolver((_of) => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query((_returns) => [Post])
  async posts() {
    return await this.postService.findAll();
  }

  @Query((_returns) => Post)
  async post(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.postService.findOneById(id);
  }
}
