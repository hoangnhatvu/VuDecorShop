import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
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

  discount_rate: Number,

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

  is_active: {
    type: Boolean,
    default: true,
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },

  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  updated_date: Date,

  updated_token: String,
  
  deleted_at: {
    type: Date,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
