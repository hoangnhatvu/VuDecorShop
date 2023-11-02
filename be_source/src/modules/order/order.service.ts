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
import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from 'src/dtos/order.dto';
import { Product } from 'src/types/product';
import { OrderStatus } from 'src/enums/order.enum';

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

  async update(
    orderId: string,
    updateOrderDTO: UpdateOrderDTO,
    userid: string,
  ) {
    try {
      const user = await this.userModel.findOne({ _id: userid });
      const order = await this.orderModel.findOne({
        _id: orderId,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }

      if (order.updated_token !== updateOrderDTO.updated_token) {
        throw new HttpException(
          'Order is being updated by another user',
          HttpStatus.CONFLICT,
        );
      }

      function getOrderStatusEnum(status) {
        return Object.keys(OrderStatus).find(
          (key) => OrderStatus[key] === status,
        );
      }

      const status = getOrderStatusEnum(updateOrderDTO.status);

      if (!status) {
        throw new HttpException('Status is not correct !', HttpStatus.CONFLICT);
      }

      const updateOrdertData = {
        ...updateOrderDTO,
        updated_token: generateUpdateToken(),
        updated_by: user,
        updated_date: Date.now(),
      };

      const updateResult = await order.updateOne(updateOrdertData);

      if (updateResult.modifiedCount > 0) {
        return { message: 'Update successfully' };
      } else {
        throw new HttpException('Update fail', HttpStatus.NOT_IMPLEMENTED);
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
