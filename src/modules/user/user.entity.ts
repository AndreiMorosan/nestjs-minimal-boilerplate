import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';

import { RoleType } from '../../constants/role-type';
import { UseDto } from '../../decorators/use-dto.decorator';
import * as Types from '../../common/types';
import { UserDto } from './dtos/user.dto';
import { UserSettingsEntity } from './user-settings.entity';
import { PostEntity } from '../post/post.entity';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: Types.Uuid;

  @Column({ nullable: true, type: 'varchar', name: 'first_name' })
  firstName!: string | null;

  @Column({ nullable: true, type: 'varchar', name: 'last_name' })
  lastName!: string | null;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role!: RoleType;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  email!: string;

  @Column({ nullable: true, type: 'varchar' })
  password!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  phone!: string | null;

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @VirtualColumn({
    query: (alias) =>
      `SELECT CONCAT(${alias}.first_name, ' ', ${alias}.last_name)`,
  })
  fullName!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToOne("UserSettingsEntity", (userSettings: UserSettingsEntity) => userSettings.user)
  settings?: UserSettingsEntity;

  @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
  posts?: PostEntity[];

  toDto(options?: any): UserDto {
    const dtoClass = Object.getPrototypeOf(this).dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new dtoClass(this, options);
  }
}
