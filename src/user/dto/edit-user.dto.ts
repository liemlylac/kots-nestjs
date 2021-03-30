import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class EditUserDTO {
  @ApiPropertyOptional({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '5553056909' })
  @IsOptional()
  @IsString()
  @Length(1, 12)
  phone?: string = null;
}
