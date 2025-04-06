import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EventSubscriber } from 'typeorm';

import { generateHash } from '../common/utils';
import { UserEntity } from '../modules/user/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): void {
    if (event.entity?.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): void {
    const entity = event.entity;
    const databaseEntity = event.databaseEntity;

    // Ensure both `entity` and `databaseEntity` are defined
    if (entity && databaseEntity) {
      if (entity.password && entity.password !== databaseEntity.password) {
        entity.password = generateHash(entity.password);
      }
    }
  }
}
