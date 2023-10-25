import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDTO } from 'src/dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { TokenBlacklist } from 'src/types/token-blacklist';

type PayloadType = {
  id: string;
  updatedToken: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('TokenBlacklist') private tokenBlacklistModel: Model<TokenBlacklist>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async login(loginDTO: LoginDTO) {
    const user = await this.userModel.findOne({
      email: loginDTO.email,
    });
    if (!user) {
      throw new HttpException(
        'Username or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Username or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: user.id,
      updatedToken: user.updated_token,
      email: user.email,
      role: user.role,
    };
    const token = await this.generateToken(payload);
    return {
      user: plainToInstance(UserDTO, user, {
        excludeExtraneousValues: true,
      }),
      token: token,
    };
  }

  async logout(userId: string, updatedToken: string, token: string) {
    try {
      const result = await this.userModel.updateOne(
        {
          id: userId,
          updated_token: updatedToken,
        },
        {
          refreshToken: null,
        },
      );
      if (result.modifiedCount === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const tokenBlacklist = new this.tokenBlacklistModel({        
        token: token,
      });
      await tokenBlacklist.save();

      return { message: 'logout successful' };
    } catch (error) {
      throw new HttpException('User is not valid', HttpStatus.BAD_REQUEST);
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verifyAsync<PayloadType>(
        refreshToken,
        {
          secret: this.configService.get('SECRET'),
        },
      );

      const user = await this.userModel.findOne({
        id: verify.id,
        updateToken: verify.updatedToken,
        refreshToken: refreshToken,
      });
      if (user) {
        return this.generateToken({
          id: user.id,
          updatedToken: user.updated_token,
          role: user.role,
          email: user.email,
        });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // generate asscess token
  private async generateToken(payload: PayloadType) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: this.configService.get('EXPIRES_IN_REFRESH_TOKEN'),
    });

    await this.userModel.updateOne(
      {
        id: payload.id,
        updateToken: payload.updatedToken,
      },
      {
        refreshToken: refreshToken,
      },
    );

    return { accessToken, refreshToken };
  }
}
