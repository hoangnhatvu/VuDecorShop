import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },

  category_image: {
    type: String,
    default: "",
  },

  is_actived: {
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
    default: null,
  },

  updated_date: {
    type: Date,
  },

  updated_token: String
});
