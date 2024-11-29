import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CloudinaryThumbNailService } from 'src/cloudinary/cloudinary.service';
import { Brand } from '../brand/schema/brand.schema';
import { error } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
    private readonly cloudinaryService: CloudinaryThumbNailService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    images: Array<Express.Multer.File>,
  ): Promise<Object> {
    console.log('services');

    const brand: Brand = await this.brandModel
      .findById(createProductDto.brand)
      .catch((err) => {
        throw new Error('Brand does not exist');
      });

    const newProduct = new this.productModel({
      ...createProductDto,
    });
    const urlThumbnail = (await this.cloudinaryService.uploadFile(images[0]))
      .secure_url;
    newProduct.thumbnail = urlThumbnail;
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const uploadedImage = await this.cloudinaryService.uploadFile(image);
        return uploadedImage.secure_url;
      }),
    );
    newProduct.images = imageUrls;
    const res = await newProduct.save().catch((err) => {
      throw new Error(err);
    });
    if (res) {
      return {
        mess: 'Create product success.',
        data: res,
      };
    } else {
      return {
        mess: 'Create product faile.',
      };
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('brand').exec();
  }

  async listProductsPaginated(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).exec(),
      this.productModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    };
  }

  async getProductByBrand(
    brandName: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    const brand = await this.brandModel.findOne({ name: brandName }).exec();

    if (!brand) {
      throw new Error('Brand not found');
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Fetch products based on the brand with pagination
    const [products, totalProducts] = await Promise.all([
      this.productModel
        .find({ brand: brand._id })
        .skip(skip)
        .limit(limit)
        .populate({ path: 'brand', select: 'name' }) // Populate only the name field for clarity
        .exec(),
      this.productModel.countDocuments({ brand: brand._id }).exec(), // Count the total products for the given brand
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    };
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('brand').exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async updateStock(productId: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock available');
    }

    product.stock -= quantity;

    return product.save();
  }

  async completeOrder(orderItems: { productId: string; quantity: number }[]) {
    for (const item of orderItems) {
      await this.updateStock(item.productId, item.quantity);
    }
    return { message: 'Order completed successfully' };
  }
}
