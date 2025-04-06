import { BadRequestException } from '@nestjs/common';

export class FileNotImageException extends BadRequestException {
  constructor(error?: string) {
    super(error || 'The uploaded file is not a valid image.');
  }
}

