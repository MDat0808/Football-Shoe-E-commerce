import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    console.log('hello');

    return this.productService.create(createProductDto, images);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/page/:page/:limit')
  fetchProductsByPage(
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.productService.listProductsPaginated(page, limit);
  }

  @Get('/brand/:page/:limit/:name')
  getProductsByBrand(
    @Param('name') brand: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.productService.getProductByBrand(brand, page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('/order')
  async completeOrder(
    @Body() body: { orderItems: { productId: string; quantity: number }[] },
  ) {
    const orderItems = body.orderItems; // Access the orderItems array from the request body

    console.log(orderItems);

    return this.productService.completeOrder(orderItems);
  }
}
