import { IsArray, IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { UserInfoDTO } from './user.dto';
import { MetaDataDTO } from './meta-data.dto';
import { ProductInfoDTO } from './product.dto';
import { BooleanPipe } from 'src/pipes/boolean.pipe';

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
export class OrderDTO extends MetaDataDTO {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserInfoDTO)
  user_id: UserInfoDTO;

  @Expose()
  @Type(() => OrderItemDTO)
  products: OrderItemDTO[];

  @Expose()
  customer_name: string;

  @Expose()
  phone_number: number;

  @Expose()
  address: string;

  @Expose()
  status: string;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateOrderItemDTO)
  products: CreateOrderItemDTO[];

  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  phone_number: number;

  @IsNotEmpty()
  address: string;
}
