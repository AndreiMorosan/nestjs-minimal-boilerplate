import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';

@Injectable()
// @ts-expect-error: Necessary to override the authenticate method without type errors
export class PublicStrategy extends PassportStrategy(Strategy, 'public') {
  override authenticate(): void {
    this.success({ [Symbol.for('isPublic')]: true });
  }
}
