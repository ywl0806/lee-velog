import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  password: string;

  @Field((_type) => [Post], { nullable: true })
  @OneToMany((_type) => Post, (post) => post.user)
  posts: Post[];

  @Field({ defaultValue: false })
  @Column({ default: false })
  isAdmin: boolean;
}
