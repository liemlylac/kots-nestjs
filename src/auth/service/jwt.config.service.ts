import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Construction will instantiate JwtConfigService inside JwtModule
   * and will leverage it to create options object
   *
   * Ref: https://github.com/nestjs/jwt#async-options
   */
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('auth.jwt.accessSecretKey'),
      signOptions: {
        expiresIn: this.configService.get<number>('auth.jwt.accessKeyLifetime'),
      },
    };
  }
}
