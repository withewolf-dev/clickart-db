import { Controller, Get, UseGuards } from '@nestjs/common';
import { currentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { MeService } from './me.service';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async me(@currentUser() user: User): Promise<User> {
    return user;
  }
}
