import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findOne(
    userFilterQuery: FilterQuery<ProductDocument>,
  ): Promise<Product> {
    return await this.productModel.findOne(userFilterQuery);
  }

  async find(
    userFilterQuery: FilterQuery<ProductDocument>,
  ): Promise<Product[]> {
    return await this.productModel.find(userFilterQuery);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<ProductDocument>,
    product: Partial<Product>,
  ): Promise<Product> {
    return await this.productModel.findOneAndUpdate(
      { productId: userFilterQuery.productId },
      product,
      {
        new: true,
      },
    );
  }

  //testing
  async findOneAndDelete(
    userFilterQuery: FilterQuery<ProductDocument>,
  ): Promise<Product> {
    return await this.productModel.findOneAndDelete({
      productId: userFilterQuery.productId,
    });
  }
}
