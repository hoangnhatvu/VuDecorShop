import { IsArray, IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { UserInfoDTO } from './user.dto';
import { MetaDataDTO } from './meta-data.dto';
import { ProductInfoDTO } from './product.dto';
import { BooleanPipe } from 'src/pipes/boolean.pipe';
import { NoInferType } from '@nestjs/config';

export class OrderItemDTO {
  @Expose()
  @Type(() => ProductInfoDTO)
  product: ProductInfoDTO;

  @Expose()
  quantity: number;
}

export class CreateOrderItemDTO {
  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  quantity: number;
}

export class PaymentDTO {
  @Expose()
  amount: number;

  @Expose()
  method: string;

  @Expose()
  status: string;
}

export class CreatePaymentDTO {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  amount: number;

  @IsNotEmpty()
  method: string;
}
export class OrderDTO extends MetaDataDTO {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserInfoDTO)
  user: UserInfoDTO;

  @Expose()
  @Type(() => OrderItemDTO)
  products: OrderItemDTO[];

  @Expose()
  customer_name: string;

  @Expose()
  phone_number: string;

  @Expose()
  address: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => PaymentDTO)
  payment: PaymentDTO;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateOrderItemDTO)
  products: CreateOrderItemDTO[];

  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Type(() => CreatePaymentDTO)
  payment: CreatePaymentDTO;
}

export class UpdateOrderDTO {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  updated_token: string;
}
