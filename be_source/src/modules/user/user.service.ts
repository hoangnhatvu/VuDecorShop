import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateUpdateToken } from 'src/common/generate-update-token';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UserDTO } from 'src/dtos/user.dto';
import { User } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const hashPassword = await this.hashPassword(createUserDto.password);
      const user = new this.userModel({
        ...createUserDto,
        updated_token: generateUpdateToken(),
        password: hashPassword,
      });

      await user.save();

      return plainToInstance(UserDTO, user, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
