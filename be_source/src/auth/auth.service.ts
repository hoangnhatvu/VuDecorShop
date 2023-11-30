import {
  Injectable, HttpException, HttpStatus, ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { LoginDTO } from 'src/dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, UserDTO } from 'src/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { TokenBlacklist } from 'src/types/token-blacklist';
import { generateUpdateToken } from 'src/common/generate-update-token';
import { hashPassword } from 'src/common/hashPassword';
import * as nodemailer from 'nodemailer';
import { otpCache } from 'src/main';

type PayloadType = {
  id: string;
  updatedToken: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  private readonly transporter;
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('TokenBlacklist') private tokenBlacklistModel: Model<TokenBlacklist>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hoangnhatvu35080@gmail.com',
        pass: 'Vu586039',
      },
    });
  }

  async sendOtpEmail(email: string) {
    if (otpCache[email]) {
      const { expirationTime } = otpCache[email];
      const currentTime = Date.now();
      if (currentTime <= expirationTime) {
        return { success: false, message: 'Mã otp hiện tại chưa hết hạn' };
      }
    }

    try {
      const expirationTime = Date.now() + 60 * 1000;
      const otp = this.generateOtp();
      otpCache[email] = { otp, expirationTime };

      const mailOptions = {
        from: 'hoangnhatvu35080@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Cảm ơn bạn đã đăng ký! Mã OTP của bạn là: ${otp}. Vui lòng đừng chia sẻ với bất kỳ ai!`,
      };
      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Email xác nhận đã được gửi đến bạn !' };

    } catch (error) {
      return { success: true, message: error };
    }
  }

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async verifyOtp(email: string, otp: string) {
    if (otpCache[email]) {
      const { otp: cachedOtp, expirationTime } = otpCache[email];
      const currentTime = Date.now();

      if (otp === cachedOtp && currentTime <= expirationTime) {
        return { success: true, message: 'Xác minh thành công' };
      } else {
        return { success: false, message: 'OTP không hợp lệ' };
      }
    } else {
      return { success: false, message: 'Không tìm thấy OTP' };
    }
  }

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

  async register(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const hashPass = await hashPassword(createUserDto.password);
      const user = new this.userModel({
        ...createUserDto,
        updated_token: generateUpdateToken(),
        password: hashPass,
      });

      await user.save();

      return plainToInstance(UserDTO, user, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Email đã tồn tại !');
      } else {
        throw new InternalServerErrorException();
      }
    }
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
