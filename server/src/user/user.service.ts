import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPODITORY')
    private userRepository: Repository<User>,
  ) {}

  findOne(username: User['username']): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, name } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      username,
      password: hashPassword,
      name,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }
}
