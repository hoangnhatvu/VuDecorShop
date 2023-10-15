import * as mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },

  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
  
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
