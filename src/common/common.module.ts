import { Global, Module } from '@nestjs/common';

import { CryptoService, HashService } from './services';

@Global()
@Module({
  providers: [HashService, CryptoService],
  exports: [HashService, CryptoService],
})
export class CommonModule {}
