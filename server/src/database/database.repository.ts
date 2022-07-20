import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [Post, User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
