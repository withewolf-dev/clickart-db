import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeModule } from './me/me.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://marlboro123:MarLboro@cluster0.nvtva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    ProductModule,
    UsersModule,
    AuthModule,
    MeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
