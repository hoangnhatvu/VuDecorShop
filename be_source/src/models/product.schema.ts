import * as mongoose from 'mongoose';
import { baseSchema } from './base.schema';

export const productSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  product_name: {
    type: String,
    required: true,
  },

  product_image: String,

  price: {
    type: Number,
    required: true,
  },

  discount_rate: {
    type: Number,
    default: 0,
  },

  view_number: {
    type: Number,
    default: 0,
  },

  order_number: {
    type: Number,
    default: 0,
  },

  description: String,

  stock: {
    type: Number,
    required: true,
  },

  is_actived: {
    type: Boolean,
    default: true,
  },

  deleted_at: {
    type: Date,
    default: null,
  },

  ...baseSchema.obj
});
