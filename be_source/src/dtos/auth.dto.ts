import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @Transform((email) => email.value.toLowerCase())
  email: string;
  @IsNotEmpty()
  password: string;
}

