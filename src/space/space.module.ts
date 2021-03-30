import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceResource } from './resources';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceResource])],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
