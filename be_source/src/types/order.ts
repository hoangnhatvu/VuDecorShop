import { User } from './user';
import { Product } from './product';
import { MetaData } from './meta-data';

export interface Order extends MetaData {
  user: User;
  products: [
    {
      product: Product;
      quantity: number;
    },
  ];
  customer_name: string;
  phone_number: number;
  address: string;
  status: string;
}
