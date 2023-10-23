import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';
import { UserDTO } from './user.dto';
export class CategoryDTO {
  @Expose()
  category_name: string;

  @Expose()
  category_image: string;

  @Expose()
  is_actived: boolean;

  @Expose()
  created_by: UserDTO;

  @Expose()
  created_date: Date;

  @Expose()
  updated_by: UserDTO;

  @Expose()
  updated_date: Date;
}

export class CreateCategoryDTO {
  @IsNotEmpty()
  user_id: string;
  
  @IsNotEmpty()
  category_name: string;

  @IsNotEmpty()
  category_image: string;
}
