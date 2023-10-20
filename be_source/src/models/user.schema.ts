import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },

  user_image: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone_number: String,

  address: String,

  role: {
    type: String,
    default: 'user',
  },

  is_active: {
    type: Boolean,
    default: false,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },

  updated_date: Date,

  updated_token: String,
});

userSchema.pre('save', async function(next:any){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }catch(error){
        return next(error);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
