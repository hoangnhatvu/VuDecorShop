import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateUpdateToken } from 'src/common/generate-update-token';
import { plainToInstance } from 'class-transformer';
import { CategoryDTO, CreateCategoryDTO } from 'src/dtos/category.dto';
import { Category } from 'src/types/category';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/types/user';
export interface PaginatedCategory {
  data: CategoryDTO[];
  page: number;
  limit: number;
  totalCount: number;
  totalPage: number;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(
    createCategoryDTO: CreateCategoryDTO,
    userid: string,
    categoryImage: string,
  ): Promise<CategoryDTO> {
    try {
      const user = await this.userModel.findOne({
        _id: userid,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const category = new this.categoryModel({
        ...createCategoryDTO,
        updated_token: generateUpdateToken(),
        category_image: categoryImage,
        created_by: user,
      });

      await category.save();

      return plainToInstance(CategoryDTO, category, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
    }
  }

  async getAll(page?: number, limit?: number): Promise<PaginatedCategory> {
    const categories = await this.categoryModel.find().populate('created_by').populate('updated_by');

    const totalCount = categories.length;

    const totalPage = Math.ceil(totalCount / limit);

    return {
      data: plainToInstance(CategoryDTO, categories, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
      page,
      limit,
      totalCount,
      totalPage,
    };
  }
}
