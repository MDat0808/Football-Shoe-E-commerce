import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Brand, BrandSchema } from '../brand/schema/brand.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    CloudinaryModule,
    NestjsFormDataModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
