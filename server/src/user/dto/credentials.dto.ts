import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Field()
  password: string;
}
