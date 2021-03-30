import { Injectable } from '@nestjs/common';
import sharp = require('sharp');
import { PngOptions, Sharp } from 'sharp';

export interface ImageSize {
  width: number;
  height: number;
}

export enum ImageType {
  // noinspection SpellCheckingInspection
  AVIF = 'avif',
  TIFF = 'tiff',
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp',
}

@Injectable()
export class ImageService {
  private readonly defaultOptions: PngOptions = {
    quality: 85,
  };

  resizeImage(imageFileName, size: ImageSize, type = ImageType.JPEG): Sharp {
    const imageResized = sharp(imageFileName).resize(size.width, size.height);
    let image: Sharp;

    switch (type) {
      case ImageType.AVIF:
        image = imageResized.avif(this.defaultOptions);
        break;
      case ImageType.TIFF:
        image = imageResized.tiff(this.defaultOptions);
        break;
      case ImageType.PNG:
        image = imageResized.png(this.defaultOptions);
        break;
      case ImageType.WEBP:
        image = imageResized.webp(this.defaultOptions);
        break;
      case ImageType.JPG:
      case ImageType.JPEG:
      default:
        image = imageResized.jpeg(this.defaultOptions);
    }

    return image;
  }
}
