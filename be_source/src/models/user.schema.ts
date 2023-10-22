import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
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

  phone_number: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
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
