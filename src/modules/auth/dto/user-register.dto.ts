import { Transform } from 'class-transformer';
import {
  EmailField,
  PasswordField,
  PhoneFieldOptional,
  StringField,
} from '../../../decorators/field.decorators';

export class UserRegisterDto {
  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @PhoneFieldOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  phone?: string;
}
