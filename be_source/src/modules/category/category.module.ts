import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { categorySchema } from 'src/models/category.schema';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }])],
    controllers: [CategoryController],
    providers: [CategoryService],
  })
  export class CategoryModule {}