import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './schemas/product.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProductById(productId: string): Promise<Product> {
    return await this.productRepository.findOne({ productId });
  }

  async getProductBySellerId(sellerId: string): Promise<Product> {
    return await this.productRepository.findOne({ sellerId });
  }

  async getProductByCtg(category: string): Promise<Product> {
    return await this.productRepository.findOne({ category });
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find({});
  }

  async createProduct(
    category: string,
    description: string,
    name: string,
    price: number,
    quantity: number,
    sellerId: string,
  ): Promise<Product> {
    return await this.productRepository.create({
      productId: uuidv4(),
      category,
      description,
      name,
      price,
      quantity,
      sellerId,
    });
  }

  async updateProduct(
    productId: string,
    productUpdates: UpdateProductDto,
  ): Promise<Product> {
    return await this.productRepository.findOneAndUpdate(
      { productId },
      productUpdates,
    );
  }

  async deleteProducts(productId: string): Promise<string> {
    await this.productRepository.findOneAndDelete({ productId });
    return 'Product Deleted';
  }
}
