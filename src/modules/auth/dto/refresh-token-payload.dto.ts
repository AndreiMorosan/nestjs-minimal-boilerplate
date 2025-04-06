import { ClassField } from '../../../decorators/field.decorators';
import { TokenPayloadDto } from './token-payload.dto';

export class RefreshTokenResponseDto {
  @ClassField(() => TokenPayloadDto)
  accessToken: TokenPayloadDto;

  @ClassField(() => TokenPayloadDto)
  refreshToken: TokenPayloadDto;

  constructor(accessToken: TokenPayloadDto, refreshToken: TokenPayloadDto) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
