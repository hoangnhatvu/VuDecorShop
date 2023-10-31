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
} from '@nestjs/common';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/common/config';
import { fileFilter } from 'src/common/fileFilter';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from 'src/dtos/product.dto';

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

  @Put('update')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseInterceptors(
    FileInterceptor('product_image', {
      storage: storageConfig('product_image'),
      fileFilter,
    }),
  )
  update(
    @Query() query: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDTO: UpdateProductDTO,
    @Req() req: any,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return this.productService.update(
      query.id,
      updateProductDTO,
      req.user_data.id,
      file ? file.destination + '/' + file.filename : null,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  @HttpCode(200)
  async getAll(@Query() query) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 20;

    return this.productService.getAll(page, limit);
  }

  
  @Put('delete')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @HttpCode(200)
  async delete(@Query() query: { id: string }) {
    return this.productService.delete(query.id);
  }
}
