import { Category } from './category';
import { MetaData } from './meta-data';

export interface Product extends MetaData {
  category_id: Category;
  product_name: string;
  product_image: string;
  price: number;
  discount_rate: number;
  view_number: number;
  order_number: number;
  description: string;
  stock: number;
  is_actived: boolean;
  deleted_at: Date;
}
