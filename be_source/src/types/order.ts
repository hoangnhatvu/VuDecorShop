import { Document } from 'mongoose';
import { User } from './user';

export interface Order extends Document {
  id: string;
  category_name: string;
  category_image: string;
  is_actived: boolean;
  created_by: User;
  created_date: Date;
  updated_by: User;
  updated_date: Date;
  updated_token: string;
}
