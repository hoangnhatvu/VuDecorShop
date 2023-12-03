import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  UseInterceptors,
  Query,
  UploadedFile,
  Req,
  BadRequestException,
  Get,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDTO } from 'src/dtos/user.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { UserRole } from 'src/enums/role.enum'
import { FileInterceptor } from '@nestjs/platform-express'
import { storageConfig } from 'src/common/config'
import { fileFilter } from 'src/common/fileFilter'
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  create(@Body() userCreate: CreateUserDto) {
    return this.userService.create(userCreate)
  }

  @Get('get')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  getUser(@Query() query: { id: string }, @Req() req: any) {
    return this.userService.getUser(query.id ? query.id : req.user_data.id)
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @UseInterceptors(
    FileInterceptor('user_image', {
      storage: storageConfig('user_image'),
      fileFilter,
    }),
  )
  update(
    @Query() query: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDTO: UpdateUserDTO,
    @Req() req: any,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    return this.userService.update(
      query.id ? query.id : req.user_data.id,
      updateUserDTO,
      file ? file.destination + '/' + file.filename : null,
    )
  }
}
