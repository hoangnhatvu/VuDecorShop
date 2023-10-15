import * as mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

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
    enum: ['Chờ xác nhận', 'Đang lấy hàng', 'Đang vận chuyển', 'Chưa đánh giá', 'Đã hoàn thành'],
    default: 'Chờ xác nhận',
  },

  created_date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
