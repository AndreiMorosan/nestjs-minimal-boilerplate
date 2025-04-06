import { ClassField } from '../../../decorators/field.decorators';
import { UserDto } from '../../user/dtos/user.dto';
import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {
  @ClassField(() => UserDto)
  user: UserDto;

  @ClassField(() => TokenPayloadDto)
  token: TokenPayloadDto;

  @ClassField(() => TokenPayloadDto)
  refreshToken: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto, refreshToken: TokenPayloadDto) {
    this.user = user;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
