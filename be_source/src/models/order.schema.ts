import * as mongoose from 'mongoose';
import { OrderStatus } from 'src/enums/order.enum';
import { baseSchema } from './base.schema';

export const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      }
    }
  ],

  customer_name: {
    type: String,
    required: true,
  },

  phone_number: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  },

  ...baseSchema.obj

});
