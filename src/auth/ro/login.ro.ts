import { ApiProperty } from '@nestjs/swagger';

export class LoginUser {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/images/avatar-person.svg',
  })
  picture: string;

  @ApiProperty({
    type: String,
  })
  accessToken: string;
}

export class LoginResult {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isSuccess: boolean;

  @ApiProperty({
    type: LoginUser,
  })
  loginUser: LoginUser;
}
