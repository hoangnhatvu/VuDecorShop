import {
    HttpException,
    HttpStatus,
    Injectable,
    Response,
  } from '@nestjs/common';
  import { generateUpdateToken } from 'src/common/generate-update-token';
  import { plainToInstance } from 'class-transformer';
  import {
    CategoryDTO,
    CreateCategoryDTO,
    UpdateCategoryDTO,
  } from 'src/dtos/category.dto';
  import { Category } from 'src/types/category';
  import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  import { User } from 'src/types/user';
  import { deleteImage } from 'src/common/deleteImage';
import { CreateProductDTO, ProductDTO } from 'src/dtos/product.dto';
import { Product } from 'src/types/product';
  
  export interface PaginatedProduct {
    data: ProductDTO[];
    page: number;
    limit: number;
    totalCount: number;
    totalPage: number;
  }
  
  @Injectable()
  export class ProductService {
    constructor(
      @InjectModel('Category') private categoryModel: Model<Category>,
      @InjectModel('Product') private productModel: Model<Product>,
      @InjectModel('User') private userModel: Model<User>,
    ) {}
  
    async create(
      createProductDTO: CreateProductDTO,
      userid: string,
      productImage: string,
    ): Promise<ProductDTO> {
      try {
        const user = await this.userModel.findOne({ _id: userid });
        const category = await this.categoryModel.findOne({ _id: createProductDTO.category_id });
  
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
  
        const product = new this.productModel({
          ...createProductDTO,
          category_id: category,
          updated_token: generateUpdateToken(),
          product_image: productImage,
          created_by: user,        
        });
  
        await product.save();
  
        return plainToInstance(ProductDTO, product, {
          excludeExtraneousValues: true,
        });
      } catch (err) {
        deleteImage(productImage);
        if (err instanceof HttpException) {
          throw err;
        } else
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  
    // async update(
    //   categoryid: string,
    //   updateCategoryDTO: UpdateCategoryDTO,
    //   userid: string,
    //   newImage: string,
    // ) {
    //   try {
    //     const user = await this.userModel.findOne({ _id: userid });
    //     const category = await this.categoryModel.findOne({ _id: categoryid });
  
    //     if (!user) {
    //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //     }
  
    //     if (!category) {
    //       throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    //     }
  
    //     if (category.updated_token !== updateCategoryDTO.updated_token) {
    //       throw new HttpException(
    //         'Category is being updated by another user',
    //         HttpStatus.CONFLICT,
    //       );
    //     }
  
    //     const oldImage = category.category_image;
  
    //     const updatedCategoryData = {
    //       ...updateCategoryDTO,
    //       updated_token: generateUpdateToken(),
    //       updated_by: user,
    //       category_image: newImage ? newImage : oldImage,
    //       updated_date: Date.now(),
    //     };
  
    //     const updateResult = await category.updateOne(updatedCategoryData);
  
    //     if (updateResult.modifiedCount > 0) {
    //       if (newImage) {
    //         deleteImage(oldImage);
    //       }
    //       return { message: 'Category updated successfully' };
    //     } else {
    //       throw new HttpException('Update fail', HttpStatus.NOT_IMPLEMENTED);
    //     }
    //   } catch (err) {
    //     deleteImage(newImage);
    //     if (err instanceof HttpException) {
    //       throw err;
    //     } else {
    //       throw new HttpException(
    //         'Internal server error',
    //         HttpStatus.INTERNAL_SERVER_ERROR,
    //       );
    //     }
    //   }
    // }
  
    // async getAll(page?: number, limit?: number): Promise<PaginatedCategory> {
    //   const categories = await this.categoryModel
    //     .find()
    //     .populate('created_by')
    //     .populate('updated_by');
  
    //   const totalCount = categories.length;
  
    //   const totalPage = Math.ceil(totalCount / limit);
  
    //   return {
    //     data: plainToInstance(CategoryDTO, categories, {
    //       excludeExtraneousValues: true,
    //       enableImplicitConversion: true,
    //     }),
    //     page,
    //     limit,
    //     totalCount,
    //     totalPage,
    //   };
    // }
  }
  