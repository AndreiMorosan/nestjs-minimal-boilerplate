import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(error || 'User is not found.');
  }
}
