import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My Awesome Post',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'The description of the post',
    example: 'This post is about awesome things.',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;
}
