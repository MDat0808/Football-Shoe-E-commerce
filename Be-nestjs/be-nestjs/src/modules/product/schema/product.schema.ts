import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  stock: number;

  @Prop({ required: true, type: Number })
  discount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object, required: true })
  colors: string[];

  @Prop({ type: [String], required: true })
  sizes: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
