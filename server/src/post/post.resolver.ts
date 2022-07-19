/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Post } from 'src/entities/post.entity';
import { InputPostDto } from './dto/createPost.dto';
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

  @UseGuards(JwtAuthGuard)
  @Mutation((_returns) => Post)
  async newPost(@Args('createPostData') postData: InputPostDto) {
    return await this.postService.createPost(postData);
  }

  @Mutation((_returns) => Post)
  async updatePost(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args('updatePostData') postData: InputPostDto,
  ) {
    return await this.postService.updatePost(id, postData);
  }

  @Mutation((_returns) => Boolean)
  async removePost(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.postService.removePost(id);
  }
}
