import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  BadRequestException,
  Put,
  Query,
} from '@nestjs/common';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderDTO } from 'src/dtos/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createOrderDTO: CreateOrderDTO, @Req() req: any) {
    return this.orderService.create(createOrderDTO, req.user_data.id);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  update(
    @Query() query: { id: string },
    @Body() updateOrdertDTO: UpdateOrderDTO,
    @Req() req: any,
  ) {
    return this.orderService.update(
      query.id,
      updateOrdertDTO,
      req.user_data.id,
    );
  }

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
