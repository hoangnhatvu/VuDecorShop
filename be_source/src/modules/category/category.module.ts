import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from 'src/models/category.schema';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { userSchema } from 'src/models/user.schema';
import { ConfigModule } from '@nestjs/config';
import { tokenBlacklistSchema } from 'src/models/token_blacklist.shema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: categorySchema },
      { name: 'User', schema: userSchema },
      { name: 'TokenBlacklist', schema: tokenBlacklistSchema },
    ]),
    ConfigModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
