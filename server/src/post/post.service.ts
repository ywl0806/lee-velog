import { Inject, Injectable } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

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
}
