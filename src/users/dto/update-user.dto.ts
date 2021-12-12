import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  phoneNo: number;
  @ApiProperty()
  name: string;
}
