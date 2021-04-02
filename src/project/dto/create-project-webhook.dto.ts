import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectWebhookDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
