import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  Query,
  Get,
} from '@nestjs/common';
import { CategoryService, PaginatedCategory } from './category.service';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCategoryDTO, FindAllCategoryDTO } from 'src/dtos/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/config';
import { fileFilter } from 'src/common/fileFilter';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(
    FileInterceptor('category_image', {
      storage: storageConfig('category_image'),
      fileFilter,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() categoryCreateDTO: CreateCategoryDTO,
    @Req() req: any,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return this.categoryService.create(
      categoryCreateDTO,
      req.user_data.id,
      file.destination + '/' + file.filename,
    );
  }

  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  @HttpCode(200)
  @Get()
  async getAll(
    @Query() query,
  ) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 20;
    
    return this.categoryService.getAll(page, limit);
  }
}
