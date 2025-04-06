import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import type { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import type { IFile } from '../../interfaces/IFile';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserRegisterDto } from '../../modules/auth/dto/user-register.dto';
import { CreateSettingsCommand } from './commands/create-settings.command';
import { CreateSettingsDto } from './dtos/create-settings.dto';
import type { UserDto } from './dtos/user.dto';
import type { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import type { UserSettingsEntity } from './user-settings.entity';
import type { Uuid } from '../../common/types';
import { UserEditPartialDto } from '../../modules/auth/dto/edit-account.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus,
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }

  findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | null> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.settings', 'settings');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }

    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }

    return queryBuilder.getOne();
  }

  @Transactional()
  async createUser(
    userRegisterDto: UserRegisterDto,
    file?: IFile,
  ): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    if (file && !this.validatorService.isImage(file.mimetype)) {
      throw new FileNotImageException();
    }

    if (file) {
      user.avatar = await this.awsS3Service.uploadImage(file);
    }

    await this.userRepository.save(user);

    user.settings = await this.createSettings(
      user.id,
      plainToClass(CreateSettingsDto, {
        isEmailVerified: false,
        isPhoneVerified: false,
      }),
    );

    return user;
  }

  @Transactional()
  async editUserAccount(
    userId: Uuid,
    userEditPartialDto: UserEditPartialDto,
    file?: IFile,
  ): Promise<UserEntity> {
    const user = await this.findOne({ id: userId });
    if (!user) {
      throw new UserNotFoundException();
    }

    if (userEditPartialDto.firstName !== undefined) {
      user.firstName = userEditPartialDto.firstName;
    }

    if (userEditPartialDto.lastName !== undefined) {
      user.lastName = userEditPartialDto.lastName;
    }

    if (userEditPartialDto.email !== undefined) {
      user.email = userEditPartialDto.email;
    }

    if (
      userEditPartialDto.phone !== undefined &&
      userEditPartialDto.phone.trim() !== ''
    ) {
      user.phone = userEditPartialDto.phone;
    }

    if (file) {
      if (!this.validatorService.isImage(file.mimetype)) {
        throw new FileNotImageException();
      }
      user.avatar = await this.awsS3Service.uploadImage(file);
    }

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<PageDto<any>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUser(userId: Uuid): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity.toDto();
  }

  createSettings(
    userId: Uuid,
    createSettingsDto: CreateSettingsDto,
  ): Promise<UserSettingsEntity> {
    return this.commandBus.execute<CreateSettingsCommand, UserSettingsEntity>(
      new CreateSettingsCommand(userId, createSettingsDto),
    );
  }
}
