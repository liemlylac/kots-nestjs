import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, Length } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  displayName: string;

  @ApiPropertyOptional({
    type: String,
    example: 'johndoe@example.com',
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional({
    type: String,
    example: '5553056909',
  })
  @IsOptional()
  @IsString()
  @Length(1, 12)
  phone: string;
}
