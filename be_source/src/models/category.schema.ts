import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },

  category_image: {
    type: String,
    required: true,
  },

  created_by: {
    type: String,
    required: true,
  },
});
