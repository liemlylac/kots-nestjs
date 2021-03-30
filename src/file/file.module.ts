import { DynamicModule, Module } from '@nestjs/common';
import { ImageService, UploadService } from './services';
import { UPLOAD_FOLDER_PATH } from './file.constant';
import * as path from 'path';

@Module({})
export class FileModule {
  static forRoot(): DynamicModule {
    const uploadFolder = {
      provide: UPLOAD_FOLDER_PATH,
      useValue: path.join(__dirname, '../..', '/uploads'),
    };
    return {
      global: true,
      module: FileModule,
      providers: [ImageService, UploadService, uploadFolder],
      exports: [UploadService],
    };
  }
}
