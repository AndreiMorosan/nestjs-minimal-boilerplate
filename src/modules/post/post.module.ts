import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreatePostHandler } from './commands/create-post.command';
import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { GetPostHandler } from './queries/get-post.query';

const handlers = [CreatePostHandler, GetPostHandler];

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService, ...handlers],
  controllers: [PostController],
})
export class PostModule { }
