import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { CreatePostCommand } from './commands/create-post.command';
import { CreatePostDto } from './dtos/create-post.dto';
import type { PostDto } from './dtos/post.dto';
import type { PostPageOptionsDto } from './dtos/post-page-options.dto';
import type { UpdatePostDto } from './dtos/update-post.dto';
import { PostNotFoundException } from '../../exceptions/post-not-found.exception';
import { PostEntity } from './post.entity';
import * as Types from '../../common/types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createPost(
    userId: Types.Uuid,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.commandBus.execute<CreatePostCommand, PostEntity>(
      new CreatePostCommand(userId, createPostDto),
    );
  }

  async getAllPost(
    postPageOptionsDto: PostPageOptionsDto,
  ): Promise<PageDto<PostDto>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    const [items, pageMetaDto] = await queryBuilder.paginate(
      postPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSinglePost(id: Types.Uuid): Promise<PostEntity> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new PostNotFoundException();
    }

    return postEntity;
  }

  async updatePost(
    id: Types.Uuid,
    updatePostDto: UpdatePostDto,
  ): Promise<void> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new PostNotFoundException();
    }

    this.postRepository.merge(postEntity, updatePostDto);

    await this.postRepository.save(postEntity);
  }

  async deletePost(id: Types.Uuid): Promise<void> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new PostNotFoundException();
    }

    await this.postRepository.remove(postEntity);
  }
}
