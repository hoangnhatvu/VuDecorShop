import * as mongoose from 'mongoose';
import { OrderStatus } from 'src/enums/order.enum';

export const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  customer_name: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
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

});
