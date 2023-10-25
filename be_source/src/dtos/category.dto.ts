import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { UserInfoDTO } from './user.dto';
export class CategoryDTO {
  @Expose()
  id: string;

  @Expose()
  category_name: string;

  @Expose()
  category_image: string;

  @Expose()
  is_actived: boolean;

  @Expose()
  @Type(() => UserInfoDTO)
  created_by: UserInfoDTO;

  @Expose()
  created_date: Date;

  @Expose()
  @Type(() => UserInfoDTO)
  updated_by: UserInfoDTO;

  @Expose()
  updated_date: Date;

  @Expose()
  updated_token: string;
}

export class CreateCategoryDTO {  
  @IsNotEmpty()
  category_name: string;  
}

export class FindAllCategoryDTO {  
  category_name: string;  
  limit?: number;
  page?: number;
}
