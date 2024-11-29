import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypesModule } from './users.module';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(User.name) private readonly typeModel: Model<User>,
  ) {}

  async create(createTypeDto: CreateUserDto): Promise<User> {
    try {
      const createdType = new this.typeModel(createTypeDto);
      return createdType.save();
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[] | null> {
    return this.typeModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.typeModel.findById(id);
  }

  update(id: number, updateTypeDto: UpdateUserDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
