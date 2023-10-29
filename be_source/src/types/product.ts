import { Document } from 'mongoose';
import { Category } from './category';
import { User } from './user';

export interface Product extends Document {
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
  created_by: User;
  created_date: Date;
  updated_by: User;
  updated_date: Date;
  updated_token: string;
  deleted_at: Date;
}
