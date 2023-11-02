import { Document } from 'mongoose';
export interface User extends Document {
  id: string;
  user_name: string;
  user_image: string;
  email: string;
  readonly password: string;
  phone_number: string;
  address: string;
  role: string;
  is_active: boolean;
  created_date: Date;
  updated_date: Date;
  updated_token: string;
}
