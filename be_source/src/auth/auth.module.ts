// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UserEntity } from '../entities/user.entity';
// import { TokenBlackListEntity } from '../entities/token-blacklist.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([UserEntity, TokenBlackListEntity]),
//     ConfigModule.forRoot(),
//     JwtModule.register({
//       global: true,
//       secret: process.env.SECRET,
//       signOptions: { expiresIn: process.env.EXPIRES_IN_ACCESS_TOKEN },
//     }),
//     ConfigModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}
