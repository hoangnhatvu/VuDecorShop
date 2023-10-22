// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { LoginUserDto } from './dto/login-user.dto';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { UserEntity } from '../entities/user.entity';
// import { TokenBlackListEntity } from '../entities/token-blacklist.entity';
// import { plainToInstance } from 'class-transformer';
// import { UserDto } from '../user/dto/user.dto';
// import { UserRole } from '../enums/role.enum';

// type PayloadType = {
//   id: string;
//   updateToken: string;
//   username: string;
//   role: string;
// };

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private userRepository: Repository<UserEntity>,
//     @InjectRepository(TokenBlackListEntity)
//     private tokenBlacklistRepository: Repository<TokenBlackListEntity>,
//     private jwtService: JwtService,
//     private configService: ConfigService,
//   ) {}
//   async login(loginUserDto: LoginUserDto) {
//     const user = await this.userRepository.findOneBy({
//       username: loginUserDto.username,
//     });
//     if (!user || user.role == UserRole.EMPLOYEE) {
//       throw new HttpException(
//         'Username or password is incorrect',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }
//     const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
//     if (!isMatch) {
//       throw new HttpException(
//         'Username or password is incorrect',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }

//     const payload = {
//       id: user.id,
//       updateToken: user.updateToken,
//       username: user.username,
//       role: user.role,
//     };
//     const token = await this.generateToken(payload);
//     return {
//       user: plainToInstance(UserDto, user, {
//         excludeExtraneousValues: true,
//       }),
//       token: token,
//     };
//   }

//   async logout(userId: string, updateToken: string, token: string) {
//     try {
//       const result = await this.userRepository.update(
//         {
//           id: userId,
//           updateToken: updateToken,
//         },
//         {
//           refreshToken: null,
//         },
//       );
//       if (result.affected === 0) {
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }
//       const tokenBlacklist = new TokenBlackListEntity();
//       tokenBlacklist.token = token;
//       this.tokenBlacklistRepository.save(tokenBlacklist);
//       return { message: 'logout successful' };
//     } catch (error) {
//       throw new HttpException('User is not valid', HttpStatus.BAD_REQUEST);
//     }
//   }

//   async refreshToken(refreshToken: string) {
//     try {
//       const verify = await this.jwtService.verifyAsync<PayloadType>(
//         refreshToken,
//         {
//           secret: this.configService.get('SECRET'),
//         },
//       );

//       const user = await this.userRepository.findOneBy({
//         id: verify.id,
//         updateToken: verify.updateToken,
//         refreshToken: refreshToken,
//       });
//       if (user) {
//         return this.generateToken({
//           id: user.id,
//           updateToken: user.updateToken,
//           role: user.role,
//           username: user.username,
//         });
//       } else {
//         throw new HttpException(
//           'Refresh token is not valid',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//     } catch (err) {
//       throw new HttpException(
//         'Refresh token is not valid',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }

//   // generate asscess token
//   private async generateToken(payload: PayloadType) {
//     const accessToken = await this.jwtService.signAsync(payload);
//     const refreshToken = await this.jwtService.signAsync(payload, {
//       secret: this.configService.get('SECRET'),
//       expiresIn: this.configService.get('EXPIRES_IN_REFRESH_TOKEN'),
//     });

//     await this.userRepository.update(
//       {
//         id: payload.id,
//         updateToken: payload.updateToken,
//       },
//       {
//         refreshToken: refreshToken,
//       },
//     );

//     return { accessToken, refreshToken };
//   }
// }
