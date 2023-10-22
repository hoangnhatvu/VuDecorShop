import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/user.dto';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  create(@Body() userCreate: CreateUserDto) {
    return this.userService.create(userCreate);
  }
}
