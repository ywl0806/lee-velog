/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckPolicies } from 'src/auth/decorator/check-policies.decorator';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { Action } from 'src/auth/enums/action.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/auth/guards/policies.guard';
import { UserPayload } from 'src/auth/types/UserPayload.type';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { InputPostDto } from './dto/createPost.dto';
import { PostService } from './post.service';

@Resolver((_of) => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Post))
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
  async newPost(
    @Args('createPostData') postData: InputPostDto,
    @GetUser() user: User,
  ) {
    return await this.postService.createPost(postData, user);
  }

  @CheckPolicies((ablilty: AppAbility) => ablilty.can(Action.Update, Post))
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
