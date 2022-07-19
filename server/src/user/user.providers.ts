import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: 'USER_REPODITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
