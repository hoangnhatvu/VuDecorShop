import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { UserInfoDTO } from 'src/dtos/user.dto';
import { CategoryInfoDTO } from './category.dto';
import { ParseBoolPipe, ParseIntPipe } from '@nestjs/common';
import { BooleanPipe } from 'src/pipes/boolean.pipe';

export class ProductDTO {
  @Expose()
  @Type(() => CategoryInfoDTO)
  category_id: CategoryInfoDTO;

  @Expose()
  product_name: string;

  @Expose()
  product_image: string;

  @Expose()
  price: number;

  @Expose()
  discount_rate: number;

  @Expose()
  view_number: number;

  @Expose()
  order_number: number;

  @Expose()
  description: string;

  @Expose()
  stock: number;

  @Expose()
  is_actived: boolean;

  @Expose()
  @Type(() => UserInfoDTO)
  created_by: UserInfoDTO;

  @Expose()
  created_date: Date;

  @Expose()
  @Type(() => UserInfoDTO)
  updated_by: UserInfoDTO;

  @Expose()
  updated_date: Date;

  @Expose()
  updated_token: string;
}

export class CreateProductDTO {
  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  discount_rate: number;

  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  is_actived: boolean;
}

export class UpdateProductDTO {
  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @Type(() => Number)
  discount_rate: number;

  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(value => new BooleanPipe().transform(value.value))
  is_actived: boolean;

  @IsNotEmpty()
  updated_token: string;
}
