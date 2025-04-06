import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { RoleType } from '../../constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import type { IFile } from '../../interfaces/IFile';
import type { Reference } from '../../types';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-payload.dto';

import { UserEditPartialDto } from './dto/edit-account.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token and refresh token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const accessToken = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    const refreshToken = await this.authService.createRefreshToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), accessToken, refreshToken);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'User registration with avatar',
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        phone: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
    @UploadedFile() file?: IFile,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(
      userRegisterDto,
      file,
    );

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: RefreshTokenResponseDto,
    description: 'Refreshes the access token and returns a new refresh token',
  })
  @ApiBearerAuth('refresh_token')
  async refreshToken(
    @Headers('authorization') authHeader: string,
  ): Promise<RefreshTokenResponseDto> {
    const refreshToken = authHeader?.split(' ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided in header');
    }

    const payload = await this.authService.validateRefreshToken(refreshToken);

    const accessToken = await this.authService.createAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    const newRefreshToken = await this.authService.createRefreshToken({
      userId: payload.userId,
      role: payload.role,
    });

    return new RefreshTokenResponseDto(accessToken, newRefreshToken);
  }

  @Patch('edit')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'Successfully edited account' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Edit user account (all fields optional)',
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Optional new avatar image',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async editAccount(
    @AuthUser() user: UserEntity,
    @Body() userEditPartialDto: UserEditPartialDto,
    @UploadedFile() file?: Reference<IFile>,
  ): Promise<UserDto> {
    const updatedUser = await this.userService.editUserAccount(
      user.id,
      userEditPartialDto,
      file,
    );
    return updatedUser.toDto();
  }
}
