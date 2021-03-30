import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRO {
  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
