import * as mongoose from 'mongoose';

const templateItemSchema = new mongoose.Schema({
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
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
  
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const TemplateItem = mongoose.model('TemplateItem', templateItemSchema);

module.exports = TemplateItem;
