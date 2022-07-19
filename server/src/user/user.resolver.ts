import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation((_returns) => User)
  async join(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
