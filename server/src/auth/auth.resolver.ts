import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CredentialsDto } from 'src/user/dto/credentials.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessToken } from './types/AccessToken';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AccessToken)
  async login(
    // @Args('userCred') _: CredentialsDto,
    @Args('password') _: string,
    @Args('username') __: string,
    @Context() context: any,
  ): Promise<{ access_token: string }> {
    console.log(context.req.user);
    return this.authService.login(context.req.user);
  }
}
