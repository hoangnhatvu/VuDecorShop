import { Document } from 'mongoose';
import { User } from './user';

export interface Category extends Document {
  category_name: string;
  category_image: string;
  is_actived: boolean;
  created_by: User;
  created_date: Date;
  updated_by: User;
  updated_date: Date;
}
