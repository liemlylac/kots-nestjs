import { Module } from '@nestjs/common';
import { WikiController } from './wiki.controller';

@Module({
  controllers: [WikiController]
})
export class WikiModule {}
