import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.usersService.getUserById(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const temp = await this.usersService
      .createUser(
        createUserDto.email,
        createUserDto.phoneNo,
        createUserDto.password,
        createUserDto.name,
        createUserDto.role,
      )
      .catch((err) => {
        if (err.code === 11000) {
          throw new HttpException('email already in use', 400);
        }
        throw new BadRequestException(err);
      });

    return temp;
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(userId, updateUserDto);
  }
}
