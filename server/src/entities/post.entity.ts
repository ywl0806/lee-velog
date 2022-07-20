/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'post title' })
  @Column({ length: 500 })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnailPath: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  userId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;
}
