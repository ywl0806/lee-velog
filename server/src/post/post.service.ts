import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InputPostDto } from './dto/createPost.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    // @Inject('POST_REPODITORY')
    // private postRepository: Repository<Post>,
    private postRepository: PostRepository,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOneById(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async createPost(postData: InputPostDto, user: User): Promise<Post> {
    // const { title, description } = postData;
    // const newPost = this.postRepository.create({ title, description });
    // await this.postRepository.save(newPost);
    // return newPost;
    console.log(user);
    return await this.postRepository.createPost(postData, user);
  }
  async updatePost(id: number, postData: InputPostDto): Promise<Post> {
    const { title, description } = postData;
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException();
    }
    post.title = title;
    post.description = description;
    post.updatedAt = new Date();
    await this.postRepository.save(post);

    return post;
  }

  async removePost(id: number): Promise<Boolean> {
    const result = await this.postRepository.delete(id);
    return result.affected > 0;
  }
}
