import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { OrderService } from './order.service';
import { CreateOrderDTO } from 'src/dtos/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createOrderDTO: CreateOrderDTO, @Req() req: any) {
    return this.orderService.create(createOrderDTO, req.user_data.id);
  }

  // @Put('update')
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  // @UseInterceptors(
  //   FileInterceptor('product_image', {
  //     storage: storageConfig('product_image'),
  //     fileFilter,
  //   }),
  // )
  // update(
  //   @Query() query: { id: string },
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() updateProductDTO: UpdateProductDTO,
  //   @Req() req: any,
  // ) {
  //   if (req.fileValidationError) {
  //     throw new BadRequestException(req.fileValidationError);
  //   }
  //   return this.productService.update(
  //     query.id,
  //     updateProductDTO,
  //     req.user_data.id,
  //     file ? file.destination + '/' + file.filename : null,
  //   );
  // }

  // @Get()
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  // @HttpCode(200)
  // async getAll(@Query() query) {
  //   const page = query.page ? Number(query.page) : 1;
  //   const limit = query.limit ? Number(query.limit) : 20;

  //   return this.productService.getAll(page, limit);
  // }
}
