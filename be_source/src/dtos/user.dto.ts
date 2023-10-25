import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Transform, Expose, Exclude } from 'class-transformer';

export class UserDTO {

  @Expose()
  id: string;

  @Expose()
  user_name: string;

  @Expose()
  user_image: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
  
  @Expose()
  phone_number: string;
  
  @Expose()
  address: string;

  @Expose()
  role: string;

  @Expose()
  is_active: boolean;

  @Expose()
  created_date: Date;

  @Expose()
  updated_date: Date;

  @Expose()
  updated_token: string;
}
export class UserInfoDTO {
  @Expose()
  id: string;
  
  @Expose()
  user_name: string;
  
  @Expose()
  email: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  user_name: string;
  
  @IsEmail()
  @IsNotEmpty()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;
}
