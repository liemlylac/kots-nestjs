import { ApiProperty } from '@nestjs/swagger';

export class LoginRO {
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
