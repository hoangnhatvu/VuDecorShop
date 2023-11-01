import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateUpdateToken } from 'src/common/generate-update-token';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/types/category';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/types/user';
import { deleteImage } from 'src/common/deleteImage';
import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from 'src/dtos/product.dto';
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
      const category = await this.categoryModel.findOne({
        _id: createProductDTO.category,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const product = new this.productModel({
        ...createProductDTO,
        category: category,
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

  async update(
    productId: string,
    updateProductDTO: UpdateProductDTO,
    userid: string,
    newImage: string,
  ) {
    try {
      const user = await this.userModel.findOne({ _id: userid });
      const category = await this.categoryModel.findOne({
        _id: updateProductDTO.category,
      });
      const product = await this.productModel.findOne({ _id: productId });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      if (product.updated_token !== updateProductDTO.updated_token) {
        throw new HttpException(
          'Product is being updated by another user',
          HttpStatus.CONFLICT,
        );
      }

      const oldImage = product.product_image;

      console.log(updateProductDTO.is_actived);

      const updateProductData = {
        ...updateProductDTO,
        updated_token: generateUpdateToken(),
        updated_by: user,
        product_image: newImage ? newImage : oldImage,
        updated_date: Date.now(),
      };

      if (product.deleted_at) {
        throw new HttpException(
          'Product have been deleted',
          HttpStatus.CONFLICT,
        );
      } else {
        const updateResult = await product.updateOne(updateProductData);

        if (updateResult.modifiedCount > 0) {
          if (newImage) {
            deleteImage(oldImage);
          }
          return { message: 'Update successfully' };
        } else {
          throw new HttpException('Update fail', HttpStatus.NOT_IMPLEMENTED);
        }
      }
    } catch (err) {
      deleteImage(newImage);
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAll(page?: number, limit?: number): Promise<PaginatedProduct> {
    const products = await this.productModel
      .find({ deleted_at: null })
      .populate('category')
      .populate('created_by')
      .populate('updated_by');

    const totalCount = products.length;

    const totalPage = Math.ceil(totalCount / limit);

    return {
      data: plainToInstance(ProductDTO, products, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
      page,
      limit,
      totalCount,
      totalPage,
    };
  }

  async delete(productId: string) {
    try {
      const product = await this.productModel.findOne({ _id: productId });

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      const oldImage = product.product_image;

      if (product.deleted_at) {
        throw new HttpException(
          'Product have been deleted',
          HttpStatus.CONFLICT,
        );
      } else {
        const updateResult = await product.updateOne({
          deleted_at: Date.now(),
          updated_token: generateUpdateToken(),
        });
        if (updateResult.modifiedCount > 0) {
          deleteImage(oldImage);
          return { message: 'Delete successfully' };
        } else {
          throw new HttpException('Delete fail', HttpStatus.NOT_IMPLEMENTED);
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
