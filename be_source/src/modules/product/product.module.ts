import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from 'src/models/category.schema';
import { userSchema } from 'src/models/user.schema';
import { ConfigModule } from '@nestjs/config';
import { BlackListModule } from '../black-list/black-list.module';
import { productSchema } from 'src/models/product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
      { name: 'User', schema: userSchema }
    ]),
    ConfigModule,
    BlackListModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
