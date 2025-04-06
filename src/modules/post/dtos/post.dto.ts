import { ApiPropertyOptional } from '@nestjs/swagger';
import type { PostEntity } from '../post.entity';

export class PostDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  constructor(postEntity: PostEntity) {
    this.title = postEntity.title;
    this.description = postEntity.description;
  }
}

