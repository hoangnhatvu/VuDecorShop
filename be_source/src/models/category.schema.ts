import * as mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
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
  
  created_date: {
    type: Date,
    default: Date.now,
  },

  is_active: { 
    type: Boolean, 
    default: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
