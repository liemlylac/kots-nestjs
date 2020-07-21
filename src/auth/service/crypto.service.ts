import { Injectable } from '@nestjs/common';
import {
  randomBytes,
  Utf8AsciiBinaryEncoding,
  createDecipheriv,
  createCipheriv,
  createHash,
} from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly cipherAlgorithm = 'aes256';
  private readonly inputEncoding = 'utf8';
  private readonly outputEncoding = 'hex';
  private readonly SPLITTER_IV = ':';

  constructor(private readonly configService: ConfigService) {}

  /**
   * Generate reset password token
   *
   * @param data
   */
  public generateCipherToken(data: Record<string, any>): string {
    const iv = randomBytes(16);
    const pepper = this.configService.get<string>('auth.pwd.pepper');
    const key = createHash('sha256')
      .update(pepper)
      .digest('base64');
    const cipher = createCipheriv(
      this.cipherAlgorithm,
      key.substring(0, 32),
      iv,
    );
    let token = cipher.update(
      JSON.stringify(data),
      this.inputEncoding as Utf8AsciiBinaryEncoding,
    );
    token = Buffer.concat([token, cipher.final()]);

    return `${iv.toString(this.outputEncoding)}${
      this.SPLITTER_IV
    }${token.toString(this.outputEncoding)}`;
  }

  /**
   * Decipher reset password from token
   *
   * @param token
   */
  public decodeCipherFromToken(token: string) {
    const parts = token.split(this.SPLITTER_IV);
    const iv = Buffer.alloc(16, parts.shift(), this.outputEncoding);
    const tokenBody = Buffer.alloc(
      80,
      parts.join(this.SPLITTER_IV),
      this.outputEncoding,
    );
    const pepper = this.configService.get<string>('auth.pwd.pepper');
    const key = createHash('sha256')
      .update(pepper)
      .digest('base64');
    const decipher = createDecipheriv(
      this.cipherAlgorithm,
      key.substring(0, 32),
      iv,
    );
    let decrypted = decipher.update(tokenBody);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  }
}
