import { ApiProperty } from '@nestjs/swagger';

export class LoginUser {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  displayName: string;

  @ApiProperty({
    type: String,
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    type: String,
  })
  token: string;
}

export class LoginResult {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  loginUser: LoginUser;
}
