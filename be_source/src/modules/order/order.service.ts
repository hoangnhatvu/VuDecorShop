import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { generateUpdateToken } from 'src/common/generate-update-token';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/types/user';
import { Order } from 'src/types/order';
import { CreateOrderDTO, OrderDTO } from 'src/dtos/order.dto';
import { Product } from 'src/types/product';

export interface PaginatedOrder {
  data: OrderDTO[];
  page: number;
  limit: number;
  totalCount: number;
  totalPage: number;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async create(
    createOrderDTO: CreateOrderDTO,
    userid: string,
  ): Promise<OrderDTO> {
    try {
      const user = await this.userModel.findOne({ _id: userid });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      try {
        const order = new this.orderModel({
          ...createOrderDTO,
          user: user,
          products: createOrderDTO.products.map((item) => ({
            product: item.product,
            quantity: item.quantity,
          })),
          updated_token: generateUpdateToken(),
          created_by: user,
        });

        try {
          await order.save();
        } catch (error) {
          throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
        return plainToInstance(OrderDTO, order, {
          excludeExtraneousValues: true,
        });
      } catch (error) {
        throw new HttpException(error, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  //   async update(
  //     productId: string,
  //     updateProductDTO: UpdateProductDTO,
  //     userid: string,
  //     newImage: string,
  //   ) {
  //     try {
  //       const user = await this.userModel.findOne({ _id: userid });
  //       const category = await this.categoryModel.findOne({
  //         _id: updateProductDTO.category_id,
  //       });
  //       const product = await this.productModel.findOne({ _id: productId });

  //       if (!user) {
  //         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //       }

  //       if (!category) {
  //         throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  //       }

  //       if (!product) {
  //         throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  //       }

  //       if (product.updated_token !== updateProductDTO.updated_token) {
  //         throw new HttpException(
  //           'Product is being updated by another user',
  //           HttpStatus.CONFLICT,
  //         );
  //       }

  //       const oldImage = product.product_image;

  //       console.log(updateProductDTO.is_actived);

  //       const updateProductData = {
  //         ...updateProductDTO,
  //         updated_token: generateUpdateToken(),
  //         updated_by: user,
  //         product_image: newImage ? newImage : oldImage,
  //         updated_date: Date.now(),
  //       };

  //       if (product.deleted_at) {
  //         throw new HttpException(
  //           'Product have been deleted',
  //           HttpStatus.CONFLICT,
  //         );
  //       } else {
  //         const updateResult = await product.updateOne(updateProductData);

  //         if (updateResult.modifiedCount > 0) {
  //           if (newImage) {
  //             deleteImage(oldImage);
  //           }
  //           return { message: 'Update successfully' };
  //         } else {
  //           throw new HttpException('Update fail', HttpStatus.NOT_IMPLEMENTED);
  //         }
  //       }
  //     } catch (err) {
  //       deleteImage(newImage);
  //       if (err instanceof HttpException) {
  //         throw err;
  //       } else {
  //         throw new HttpException(
  //           'Internal server error',
  //           HttpStatus.INTERNAL_SERVER_ERROR,
  //         );
  //       }
  //     }
  //   }

  //   async getAll(page?: number, limit?: number): Promise<PaginatedProduct> {
  //     const products = await this.productModel
  //       .find({ deleted_at: null })
  //       .populate('category_id')
  //       .populate('created_by')
  //       .populate('updated_by');

  //     const totalCount = products.length;

  //     const totalPage = Math.ceil(totalCount / limit);

  //     return {
  //       data: plainToInstance(ProductDTO, products, {
  //         excludeExtraneousValues: true,
  //         enableImplicitConversion: true,
  //       }),
  //       page,
  //       limit,
  //       totalCount,
  //       totalPage,
  //     };
  //   }
}
