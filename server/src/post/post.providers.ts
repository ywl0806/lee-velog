import { Post } from 'src/entities/post.entity';
import { DataSource } from 'typeorm';

export const postProviders = [
  {
    provide: 'POST_REPODITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: ['DATA_SOURCE'],
  },
];
