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
    Put,
    Param,
  } from '@nestjs/common';
  import { UserRole } from 'src/enums/role.enum';
  import { AuthGuard } from 'src/guards/auth.guard';
  import { Roles } from 'src/decorators/roles.decorator';
  import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/dtos/category.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { storageConfig } from 'src/common/config';
  import { fileFilter } from 'src/common/fileFilter';
import { ProductService } from './product.service';
import { CreateProductDTO } from 'src/dtos/product.dto';
  
  @Controller('products')
  export class ProductController {
    constructor(private productService: ProductService) {}
    @Post('create')
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
    @UseInterceptors(
      FileInterceptor('product_image', {
        storage: storageConfig('product_image'),
        fileFilter,
      }),
    )
    create(
      @UploadedFile() file: Express.Multer.File,
      @Body() createProductDTO: CreateProductDTO,
      @Req() req: any,
    ) {
      if (req.fileValidationError) {
        throw new BadRequestException(req.fileValidationError);
      }
      return this.productService.create(
        createProductDTO,
        req.user_data.id,
        file ? file.destination + '/' + file.filename : null,
      );
    }
  
    // @Put('update')
    // @UseGuards(AuthGuard)
    // @Roles(UserRole.ADMIN)
    // @UseInterceptors(
    //   FileInterceptor('category_image', {
    //     storage: storageConfig('category_image'),
    //     fileFilter,
    //   }),
    // )
    // update(
    //   @Query() query: { id: string;},
    //   @UploadedFile() file: Express.Multer.File,
    //   @Body() categoryUpdateDTO: UpdateCategoryDTO,
    //   @Req() req: any,
    // ) {
    //   if (req.fileValidationError) {
    //     throw new BadRequestException(req.fileValidationError);
    //   }
    //   return this.categoryService.update(
    //     query.id,
    //     categoryUpdateDTO,
    //     req.user_data.id,
    //     file ? file.destination + '/' + file.filename : null,
    //   );
    // }
  
    // @UseGuards(AuthGuard)
    // @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
    // @HttpCode(200)
    // @Get()
    // async getAll(
    //   @Query() query,
    // ) {
    //   const page = query.page ? Number(query.page) : 1;
    //   const limit = query.limit ? Number(query.limit) : 20;
      
    //   return this.categoryService.getAll(page, limit);
    // }
  }
  