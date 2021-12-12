import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':productId')
  // @UseGuards(JwtAuthGuard)
  async getProduct(@Param('productId') productId: string): Promise<Product> {
    return await this.productService.getProductById(productId);
  }

  @Get('seller/:sellerId')
  // @UseGuards(JwtAuthGuard)
  async getProductbySeller(
    @Param('sellerId') sellerId: string,
  ): Promise<Product> {
    return await this.productService.getProductBySellerId(sellerId);
  }

  @Get('category/:ctg')
  // @UseGuards(JwtAuthGuard)
  async getProductbyCtg(@Param('ctg') ctg: string): Promise<Product> {
    return await this.productService.getProductByCtg(ctg);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Post()
  async createUser(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    const temp = await this.productService.createProduct(
      createProductDto.category,
      createProductDto.description,
      createProductDto.name,
      createProductDto.price,
      createProductDto.quantity,
      createProductDto.sellerId,
    );

    return temp;
  }

  @Patch(':productId')
  //@UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string): Promise<string> {
    return await this.productService.deleteProducts(productId);
  }
}
