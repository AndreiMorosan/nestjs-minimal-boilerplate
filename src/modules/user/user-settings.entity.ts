import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, type Relation } from 'typeorm';

import { UseDto } from '../../decorators/use-dto.decorator';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_settings' })
@UseDto(UserDto)
export class UserSettingsEntity {
  @Column({ default: false })
  isEmailVerified?: boolean;

  @Column({ default: false })
  isPhoneVerified?: boolean;

  @PrimaryColumn({ type: 'uuid' })
  userId?: string;

  @OneToOne("UserEntity", (user: UserEntity) => user.settings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: Relation<UserEntity>;
}
