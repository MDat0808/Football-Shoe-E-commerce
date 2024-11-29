import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './schema/brand.schema';
import { Model } from 'mongoose';
import { Product } from '../product/schema/product.schema';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createBrandDto: CreateBrandDto): Promise<Object> {
    const newBrand = new this.brandModel({
      ...createBrandDto,
    });
    const res = await newBrand.save().catch((err) => {
      throw new Error(err);
    });
    if (res) {
      return {
        mess: 'Create brand success.',
        data: res,
      };
    } else {
      return {
        mess: 'Create brand faile.',
      };
    }
  }

  async findAll(): Promise<{ brand: string; productCount: number }[]> {
    const brandsWithCounts = await this.productModel.aggregate([
      {
        $group: {
          _id: '$brand', // Group by the brand ObjectId
          productCount: { $sum: 1 }, // Count the number of products per brand
        },
      },
      {
        $lookup: {
          from: 'brands', // Name of the brand collection
          localField: '_id',
          foreignField: '_id',
          as: 'brandDetails',
        },
      },
      {
        $unwind: '$brandDetails', // Unwind the brand details array
      },
      {
        $project: {
          brand: '$brandDetails.name', // Select only the brand name
          productCount: 1, // Include the product count
        },
      },
    ]);

    return brandsWithCounts;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
