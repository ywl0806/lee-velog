import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InputPostDto } from './dto/createPost.dto';

@Injectable()
export class PostRepository extends Repository<Post> {
  async createPost(post: InputPostDto, user: User): Promise<Post> {
    this.find();
    const newPost = this.create({ ...post, user });
    await this.save(newPost);
    return newPost;
  }
}
