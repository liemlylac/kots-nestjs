import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   * Construction will instantiate JwtConfigService inside JwtModule
   * and will leverage it to create options object
   *
   * Ref: https://github.com/nestjs/jwt#async-options
   */
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get('auth.accessTokenSecret'),
      signOptions: {
        expiresIn: this.config.get('auth.accessTokenLifetime'),
      },
    };
  }
}
