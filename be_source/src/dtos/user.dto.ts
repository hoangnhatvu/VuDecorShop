import { IsNotEmpty, Length, IsEmail, IsOptional, IsBoolean, IsArray, Matches, IsPhoneNumber, MaxLength, IsDateString } from 'class-validator';
import { Transform, Expose, Exclude, Type } from 'class-transformer';
import { BooleanPipe } from 'src/pipes/boolean.pipe';

export class ShipInfoDTO {
  @Expose()
  id: string;

  @Expose()
  customer_name: string;

  @Expose()
  phone_number: string;
  
  @Expose()
  address: string;

  @Expose()
  is_default: boolean;
}

export class UpdateShipInfoDTO {
  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone_number: string;
  
  @IsNotEmpty()
  @MaxLength(200)
  address: string;

  @IsOptional()
  @IsBoolean()
  @Transform((value) => new BooleanPipe().transform(value.value))
  is_default: boolean;
}
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
  role: string;

  @Expose()
  birth_date: string;

  @Expose()
  @Type(() => ShipInfoDTO)
  ship_infos: ShipInfoDTO[];

  @Expose()
  is_active: boolean;

  @Expose()
  is_blocked: boolean;

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

export class UpdateUserDTO {
  @IsOptional()
  user_name: string;
  
  @IsOptional()
  role: string;

  @IsOptional()
  @IsArray()
  @Type(() => UpdateShipInfoDTO)
  ship_infos: UpdateShipInfoDTO[];

  @IsOptional()
  @IsDateString()
  birth_date: Date

  @IsOptional()
  @IsBoolean()
  @Transform((value) => new BooleanPipe().transform(value.value))
  is_active: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform((value) => new BooleanPipe().transform(value.value))
  is_blocked: boolean;

  @IsNotEmpty()
  updated_token: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  user_name: string;
  
  @IsEmail()
  @IsNotEmpty()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @Length(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message: 'Mật khẩu phải chứa ít nhất một ký tự in hoa, một ký tự thường, một chữ số và một ký tự đặc biệt!',
  })
  password: string;
  
  @IsNotEmpty()
  role: string;
}
