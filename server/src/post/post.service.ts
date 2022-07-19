import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { InputPostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPODITORY')
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOneById(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  async createPost(postData: InputPostDto): Promise<Post> {
    const { title, description } = postData;
    try {
      const newPost = this.postRepository.create({ title, description });
      await this.postRepository.save(newPost);
      return newPost;
    } catch (e) {
      throw new NotFoundException(e);
    }
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
