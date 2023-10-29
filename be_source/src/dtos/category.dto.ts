import { IsNotEmpty} from 'class-validator';
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

export class UpdateCategoryDTO {  
  @IsNotEmpty()
  category_name: string;  

  updated_token: string;

  is_actived: boolean;
}

export class CategoryInfoDTO {
  @Expose()
  id: string;

  @Expose()
  category_name: string;
}