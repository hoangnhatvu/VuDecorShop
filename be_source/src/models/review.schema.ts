import * as mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  rate: {
    type: Number,
    required: true,
  },

  content: String,

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
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
