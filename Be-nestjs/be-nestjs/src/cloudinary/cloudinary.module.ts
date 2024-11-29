import { Module } from '@nestjs/common';
import { CloudinaryThumbNailService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary/cloudinary';
@Module({
  providers: [CloudinaryThumbNailService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryThumbNailService],
})
export class CloudinaryModule {}
