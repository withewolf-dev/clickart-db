import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional()
  quantity: number;
}
