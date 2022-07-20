import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const postProviders = [
  {
    provide: 'POST_REPODITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Post).extend({
        createPost(post: Post, user: User) {
          const newPost = this.create(post);
          return newPost;
        },
      }),
    inject: ['DATA_SOURCE'],
  },
];
