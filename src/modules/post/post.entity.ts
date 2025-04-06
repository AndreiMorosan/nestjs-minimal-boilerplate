import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';

import { UseDto } from '../../decorators/use-dto.decorator';
import { UserEntity } from '../user/user.entity';
import { PostDto } from './dtos/post.dto';
import * as Types from '../../common/types';

@Entity({ name: 'posts' })
@UseDto(PostDto)
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: Types.Uuid;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<UserEntity>;

  toDto(): PostDto {
    return new PostDto(this);
  }
}
