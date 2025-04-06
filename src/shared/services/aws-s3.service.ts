import { S3 } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import mime from 'mime-types';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import type { IFile } from '../../interfaces/IFile';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3;

  constructor(
    public configService: ApiConfigService,
    public generatorService: GeneratorService,
  ) {
    const {
      bucketApiVersion,
      bucketRegion,
      accessKeyId,
      secretAccessKey,
    } = configService.awsS3Config;

    this.s3 = new S3({
      apiVersion: bucketApiVersion,
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async uploadImage(file: IFile): Promise<string> {
    const extension = mime.extension(file.mimetype) || 'bin';
    const fileName = this.generatorService.fileName(extension);
    const key = `images/${fileName}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.configService.awsS3Config.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
  }

  async getImagePresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.configService.awsS3Config.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3, command, { expiresIn });
  }
}
