import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';

@Injectable()
export class CryptoService {
  private readonly cipherAlgorithm = 'aes256';
  private readonly inputEncoding = 'utf8';
  private readonly outputEncoding = 'hex';
  private readonly SPLITTER_IV = ':';
  private readonly IV_LENGTH = 16;

  constructor(private readonly config: ConfigService) {}

  /**
   * Encrypt data to hash string
   */
  public encryptCipheriv(data: Record<string, any>): string {
    const iv = randomBytes(this.IV_LENGTH);
    const pepper = this.config.get('auth.pepper');
    const key = createHash('sha256')
      .update(pepper)
      .digest('base64');
    const cipher = createCipheriv(
      this.cipherAlgorithm,
      key.substring(0, 32),
      iv,
    );
    let token = cipher.update(JSON.stringify(data), this.inputEncoding);
    token = Buffer.concat([token, cipher.final()]);

    return `${iv.toString(this.outputEncoding)}${
      this.SPLITTER_IV
    }${token.toString(this.outputEncoding)}`;
  }

  /**
   * Decrypt from hash string
   */
  public decryptCipheriv(hash: string) {
    const parts = hash.split(this.SPLITTER_IV);
    const iv = Buffer.from(parts.shift(), this.outputEncoding);
    const tokenBody = Buffer.from(
      parts.join(this.SPLITTER_IV),
      this.outputEncoding,
    );
    const pepper = this.config.get('auth.pepper');
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
