import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { extname, join } from 'path';
import { UPLOAD_FOLDER_PATH } from '../file.constant';

@Injectable()
export class UploadService {
  constructor(
    @Inject(UPLOAD_FOLDER_PATH)
    private readonly root: string,
  ) {}

  private readonly defaultOptions = {
    maxFileSize: 5 * Math.pow(1024, 2), // 5 MB
  };

  uploadFile(path: string, fileName: string, file: Express.Multer.File) {
    const filePath = join(this.root, path);

    if (!this.pathExists(filePath)) {
      this.createPath(filePath);
    }

    return this.writeFile(filePath, {
      fileName: fileName,
      data: file.buffer,
      ext: extname(file.originalname),
    });
  }

  pathExists(path) {
    return fs.existsSync(path);
  }

  createPath(path, recursive = true) {
    fs.mkdirSync(path, { recursive });
  }

  writeFile(path, file: { fileName: string; data: any; ext: string }) {
    fs.writeFileSync(join(path, `${file.fileName}${file.ext}`), file.data);
  }

  validateFileSize(file, maxFileSize?: number): boolean {
    const maxSize = maxFileSize ?? this.defaultOptions.maxFileSize;
    return file.size <= maxSize;
  }
}
