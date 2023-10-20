import {Body,Controller,Post,Get,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/user.dto';


@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,){}

    @Post('register')
    async register(@Body() userDTO: CreateUserDto){
        const user = await this.userService.create(userDTO);
        const payload = {
            email: user.email,
        }
        const token = await this.authService.signPayload(payload);
        return {user,token}
    }
}