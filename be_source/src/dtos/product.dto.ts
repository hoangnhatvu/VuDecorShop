import { IsBoolean, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { CategoryInfoDTO } from './category.dto';
import { BooleanPipe } from 'src/pipes/boolean.pipe';
import { MetaDataDTO } from './meta-data.dto';

export class ProductDTO extends MetaDataDTO {
  @Expose()
  id: string;

  @Expose()
  @Type(() => CategoryInfoDTO)
  category: CategoryInfoDTO;

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
}

export class ProductInfoDTO {
  @Expose()
  id: string;

  @Expose()
  product_name: string;

  @Expose()
  product_image: string;

  @Expose()
  price: number;
}

export class CreateProductDTO {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  discount_rate: number;

  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform((value) => new BooleanPipe().transform(value.value))
  is_actived: boolean;
}

export class UpdateProductDTO {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(100)
  discount_rate: number;

  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform((value) => new BooleanPipe().transform(value.value))
  is_actived: boolean;

  @IsNotEmpty()
  updated_token: string;
}
