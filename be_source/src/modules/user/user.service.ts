import { Injectable, ConflictException, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { generateUpdateToken } from 'src/common/generate-update-token'
import { plainToInstance } from 'class-transformer'
import { CreateUserDto, UpdateUserDTO, UserDTO } from 'src/dtos/user.dto'
import { User } from 'src/types/user'
import { hashPassword } from 'src/common/hashPassword'
import { deleteImage } from 'src/common/deleteImage'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const hashPass = await hashPassword(createUserDto.password)
      const user = new this.userModel({
        ...createUserDto,
        updated_token: generateUpdateToken(),
        password: hashPass,
      })

      await user.save()

      return plainToInstance(UserDTO, user, {
        excludeExtraneousValues: true,
      })
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException('Email already exists !')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async update(userid: string, updateUserDTO: UpdateUserDTO, newImage: string) {
    try {
      const user = await this.userModel.findOne({ _id: userid })

      if (!user) {
        throw new HttpException('Không tìm thấy user', HttpStatus.NOT_FOUND)
      }

      if (user.updated_token !== updateUserDTO.updated_token) {
        throw new HttpException('User đang được cập nhật bởi ai đó!', HttpStatus.CONFLICT)
      }

      const oldImage = user.user_image

      const updateUserData = {
        ...updateUserDTO,
        updated_token: generateUpdateToken(),
        user_image: newImage ? newImage : oldImage,
        updated_date: Date.now(),
      }

      if (user.is_blocked) {
        throw new HttpException('User đã bị chặn', HttpStatus.CONFLICT)
      } else {
        const updateResult = await user.updateOne(updateUserData)

        if (updateResult.modifiedCount > 0) {
          if (newImage) {
            deleteImage(oldImage)
          }
          return { message: 'Cập nhật thành công' }
        } else {
          throw new HttpException('Cập nhật thất bại', HttpStatus.NOT_IMPLEMENTED)
        }
      }
    } catch (err) {
      deleteImage(newImage)
      if (err instanceof HttpException) {
        throw err
      } else {
        throw new HttpException('Lỗi Internet', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  async getUser(userid: string): Promise<UserDTO> {
    try {
      const user = await this.userModel.findOne({ _id: userid })

      if (!user) {
        throw new HttpException('Không tìm thấy user', HttpStatus.NOT_FOUND)
      } else {
        return plainToInstance(UserDTO, user, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err
      } else {
        throw new HttpException('Lỗi Internet', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
