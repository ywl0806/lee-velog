import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field((type) => String)
  access_token: string;
}
