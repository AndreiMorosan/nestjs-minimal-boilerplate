import {
  EmailField,
  StringField,
} from '../../../decorators/field.decorators';

export class UserLoginDto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly password!: string;
}
