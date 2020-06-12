import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashService {
  private readonly pepper: string;

  constructor(private readonly configService: ConfigService) {
    this.pepper = this.configService.get<string>('auth.pepper');
  }

  getSalt(): string {
    return bcrypt.genSaltSync(10);
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password + this.pepper, this.getSalt());
  }

  compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password + this.pepper, hash);
  }
}
