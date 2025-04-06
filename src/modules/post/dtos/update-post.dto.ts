import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'The updated title of the post',
    example: 'Updated Post Title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'The updated description of the post',
    example: 'Updated post description text',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
