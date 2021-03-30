import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenRO } from './refresh-token.ro';

export class LoginResultRO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ type: RefreshTokenRO })
  token: RefreshTokenRO;
}
