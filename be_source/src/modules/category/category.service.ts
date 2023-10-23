import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { generateUpdateToken } from 'src/common/generate-update-token';
import { plainToInstance } from 'class-transformer';
import { CategoryDTO, CreateCategoryDTO } from 'src/dtos/category.dto';
import { Category } from 'src/types/category';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/types/user';
export interface PaginatedCategory {
  data: CategoryDTO[];
  page: number;
  limit: number;
  totalCount: number;
  totalPage: number;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<CategoryDTO> {
    try {
      const user = await this.userModel.findOne({
        _id: createCategoryDTO.user_id,
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const category = new this.categoryModel({
        ...createCategoryDTO,
        updated_token: generateUpdateToken(),
        updated_by: user,
      });

      await category.save();

      return plainToInstance(CategoryDTO, category, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
    }
  }

  // async update(updateEstimationDto: UpdateEstimationDto): Promise<object> {
  //   try {
  //     const estimation = await this.estimationRepository.findOne({
  //       where: {
  //         id: updateEstimationDto.id,
  //         deletedAt: IsNull(),
  //       },
  //     });
  //     if (!estimation) {
  //       throw new HttpException('Estimation not found', HttpStatus.NOT_FOUND);
  //     }
  //     if (estimation.updateToken != updateEstimationDto.updateToken) {
  //       throw new HttpException(
  //         'Estimation have updated by another user',
  //         HttpStatus.CONFLICT,
  //       );
  //     }

  //     const user = await this.userRepository.findOneBy({
  //       id: updateEstimationDto.userId,
  //     });
  //     if (!user) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }

  //     const saler = await this.salerRepository.findOneBy({
  //       id: updateEstimationDto.salerId,
  //     });
  //     if (!saler) {
  //       throw new HttpException('Saler not found', HttpStatus.NOT_FOUND);
  //     }

  //     const customer = await this.customerRepository.findOneBy({
  //       id: updateEstimationDto.customerId,
  //     });
  //     if (!customer) {
  //       throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  //     }

  //     estimation['name'] = updateEstimationDto.name;
  //     estimation['startDate'] = updateEstimationDto.startDate;
  //     estimation['status'] = updateEstimationDto.status;
  //     estimation['winRate'] = updateEstimationDto.winRate;
  //     estimation['manMonth'] = updateEstimationDto.manMonth;
  //     estimation['description'] = updateEstimationDto.description;
  //     estimation['saler'] = saler;
  //     estimation['customer'] = customer;
  //     estimation['user'] = user;
  //     estimation['updateToken'] = generateUpdateToken();

  //     this.estimationRepository.save(estimation);
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw err;
  //     }
  //   }
  //   return;
  // }

  // async delete(id: string, updateToken: string) {
  //   try {
  //     const result = await this.estimationRepository.softDelete({
  //       id,
  //       updateToken,
  //     });
  //     if (result.affected === 0) {
  //       throw new HttpException('Estimation not found', HttpStatus.NOT_FOUND);
  //     }
  //     return result;
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw err;
  //     } else
  //       throw new HttpException(
  //         'Internal server error',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //   }
  // }
}
