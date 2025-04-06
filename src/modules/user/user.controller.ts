import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants/role-type';
import { ApiPageResponse } from '../../decorators/api-page-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { UserDto } from './dtos/user.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import * as Types from '../../common/types';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('admin')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  async admin(@AuthUser() user: UserEntity) {
    return {
      text: `${user.firstName}`,
    };
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageResponse({
    description: 'Get users list',
    type: PageDto,
  })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    description: 'The UUID of the user',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UserDto,
  })
  getUser(@UUIDParam('id') userId: Types.Uuid): Promise<UserDto> {
    return this.userService.getUser(userId);
  }
}
