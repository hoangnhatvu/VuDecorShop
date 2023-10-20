import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/types/user';

@Injectable()
export class UserService {
    // define  a  constructor to inject  the  model  into  the  service
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // create  a  new  user
    async create(userDTO: CreateUserDto): Promise<User> {
        const { email } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            // User already exists
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return createdUser;        
    }
}