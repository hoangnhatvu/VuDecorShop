import * as mongoose from 'mongoose';
import { UserRole } from 'src/enums/role.enum';

export const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },

  user_image: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },

  is_active: {
    type: Boolean,
    default: false,
  },

  is_blocked: {
    type: Boolean,
    default: false,
  },

  ship_infos: [{
    customer_name: {
      type: String,
      default: ""
    },

    phone_number: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },
  }],

  refresh_token: {
    type: String,
    default: null,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },

  updated_date: {
    type: Date,
    default: ""
  },

  updated_token: {
    type: String,
    default: ""
  },
});

userSchema.path('ship_infos').validate(function(value) {
  return value.length <= 3;
}, 'Không được phép lưu quá 3 địa chỉ!');
