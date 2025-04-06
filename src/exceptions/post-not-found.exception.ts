import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(error || 'The page was not found.');
  }
}
