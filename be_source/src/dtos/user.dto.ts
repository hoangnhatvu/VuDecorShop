import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  user_name: string;
  @IsEmail()
  @IsNotEmpty()
  @Transform((email) => email.value.toLowerCase())
  email: string;
  @IsNotEmpty()
  @Length(4)
  password: string;
}
