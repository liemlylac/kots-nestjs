import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export enum UserProfileType {
  Profile = 'profile',
  Detail = 'detail',
}

export class UserProfileRO {
  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile, UserProfileType.Detail] })
  firstName: string;

  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile, UserProfileType.Detail] })
  lastName: string;

  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile, UserProfileType.Detail] })
  email: string;

  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile] })
  phone: string;

  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile, UserProfileType.Detail] })
  avatar: string;

  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile, UserProfileType.Detail] })
  gender: string;

  @ApiProperty()
  @Expose({ groups: [UserProfileType.Profile] })
  birthday: string;
}
