import { IsOptional, IsString } from 'class-validator';

export class CreateIssueDto {
  @IsString()
  name: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  finishDate: Date;
}
