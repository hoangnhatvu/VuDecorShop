import {
  Req,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoginDTO } from 'src/dtos/auth.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
  

  @Post('refresh-token')
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  @Post('logout')
  logout(
    @Req() request: any,
    @Body() body: { userId: string; updatedToken: string },
  ) {
    return this.authService.logout(
      body.userId,
      body.updatedToken,
      request.token,
    );
  }
}
