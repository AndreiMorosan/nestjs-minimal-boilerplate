import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants/role-type';
import { ApiPageResponse } from '../../decorators/api-page-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { UserEntity } from '../user/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostDto } from './dtos/post.dto';
import { PostPageOptionsDto } from './dtos/post-page-options.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';
import * as Types from '../../common/types';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: PostDto })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @AuthUser() user: UserEntity,
  ) {
    const postEntity = await this.postService.createPost(
      user.id,
      createPostDto,
    );

    return postEntity.toDto();
  }

  @Get()
  @Auth([RoleType.USER])
  @ApiPageResponse({ type: PostDto })
  async getPosts(
    @Query() postsPageOptionsDto: PostPageOptionsDto,
  ): Promise<PageDto<PostDto>> {
    return this.postService.getAllPost(postsPageOptionsDto);
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PostDto })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the post',
    type: String,
  })
  async getSinglePost(@UUIDParam('id') id: Types.Uuid): Promise<PostDto> {
    const entity = await this.postService.getSinglePost(id);

    return entity.toDto();
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  @ApiParam({
    name: 'id',
    description: 'The UUID of the post',
    type: String,
  })
  updatePost(
    @UUIDParam('id') id: Types.Uuid,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse()
  @ApiParam({
    name: 'id',
    description: 'The UUID of the post',
    type: String,
  })
  async deletePost(@UUIDParam('id') id: Types.Uuid): Promise<void> {
    await this.postService.deletePost(id);
  }
}
