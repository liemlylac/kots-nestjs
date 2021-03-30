import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsUUID } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty()
  @IsUUID()
  deviceId: string;

  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
