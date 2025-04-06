import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { RoleType } from '../../constants/role-type';
import { TokenType } from '../../constants/token-type';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../../modules/user/user.entity';
import { UserService } from '../user/user.service';
import { Uuid } from '../../common/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: Uuid;
    role: RoleType;
    type: TokenType;
  }): Promise<UserEntity> {

    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    // Fetch the user from the database using the provided userId and role
    const user = await this.userService.findOne({
      id: args.userId as never, // Adjusted for compatibility, if necessary
      role: args.role,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
