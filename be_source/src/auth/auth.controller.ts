import { Req, Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '../guards/auth.guard'
import { ForgotPasswordDTO, LoginDTO, RegisterDTO, SendOtpDTO, VerifyOtpDTO } from 'src/dtos/auth.dto'
import { Roles } from 'src/decorators/roles.decorator'
import { UserRole } from 'src/enums/role.enum'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO)
  }

  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO)
  }

  @Post('otp')
  @HttpCode(200)
  sendOtpEmail(@Body() sendOtpDTO: SendOtpDTO) {
    return this.authService.sendOtpEmail(sendOtpDTO)
  }

  @Post('verify')
  @HttpCode(200)
  verifyOtp(@Body() verifyOtpDTO: VerifyOtpDTO) {
    return this.authService.verifyOtp(verifyOtpDTO)
  }

  @Post('forgotPassword')
  @HttpCode(200)
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDTO)
  }

  @Post('refresh-token')
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken)
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.USER)
  @Post('logout')
  logout(@Req() request: any, @Body() body: { userId: string; updatedToken: string }) {
    return this.authService.logout(body.userId, body.updatedToken, request.token)
  }
}
