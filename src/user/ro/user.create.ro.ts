import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRo {
  @ApiProperty()
  displayName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}
