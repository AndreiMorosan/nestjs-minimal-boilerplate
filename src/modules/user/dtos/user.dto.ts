import { UserEntity } from '../user.entity';

export class UserDto {
  id: string;
  username: string;
  email: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.username = entity.firstName + ' ' + entity.lastName;
    this.email = entity.email;
  }
}
