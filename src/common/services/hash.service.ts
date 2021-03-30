import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  getSalt(hash: string) {
    return bcrypt.getSalt(hash);
  }

  genSalt(rounds = 10): string {
    return bcrypt.genSaltSync(rounds);
  }

  hash(plaintText: string, pepper?: string): Promise<string> {
    const stringToHash = pepper ? plaintText + pepper : plaintText;
    return bcrypt.hash(stringToHash, this.genSalt());
  }

  compareHash(
    plaintText: string,
    hash: string,
    pepper?: string,
  ): Promise<boolean> {
    const stringToHash = pepper ? plaintText + pepper : plaintText;
    return bcrypt.compare(stringToHash, hash);
  }
}
