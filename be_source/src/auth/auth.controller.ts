// import {
//     Req,
//     Body,
//     Controller,
//     HttpCode,
//     Post,
//     UseGuards,
//   } from '@nestjs/common';
//   import { AuthService } from './auth.service';
//   import { AuthGuard } from '../guards/auth.guard';
//   import { LoginUserDto } from './dto/login-user.dto';
//   import { UserRole } from '../enums/role.enum';
//   import { Roles } from '../roles/roles.decorator';
  
//   @Controller('auth')
//   export class AuthController {
//     constructor(private authService: AuthService) {}
//     @Post('login')
//     login(@Body() loginUserDto: LoginUserDto) {
//       return this.authService.login(loginUserDto);
//     }
  
//     @Post('refresh-token')
//     refreshToken(@Body('refreshToken') refreshToken: string) {
//       return this.authService.refreshToken(refreshToken);
//     }
  
//     @UseGuards(AuthGuard)
//     @Roles(UserRole.ADMIN, UserRole.BOD, UserRole.HR, UserRole.PM)
//     @HttpCode(200)
//     @Post('logout')
//     logout(
//       @Req() request: any,
//       @Body() body: { userId: string; updateToken: string },
//     ) {
//       return this.authService.logout(
//         body.userId,
//         body.updateToken,
//         request.token,
//       );
//     }
//   }
  