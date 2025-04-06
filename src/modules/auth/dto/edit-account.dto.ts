import { PartialType } from '@nestjs/swagger';
import {
  EmailField,
  PhoneFieldOptional,
  StringField,
} from '../../../decorators/field.decorators';
import { Transform } from 'class-transformer';

export class UserEditDto {
  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PhoneFieldOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  phone?: string;
}

export class UserEditPartialDto extends PartialType(UserEditDto) {}
