import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Max } from 'class-validator';

@InputType()
export class InputPostDto {
  @IsString()
  @Max(40)
  @IsNotEmpty()
  @Field()
  title: string;

  @Field()
  @IsString()
  description: string;
}
