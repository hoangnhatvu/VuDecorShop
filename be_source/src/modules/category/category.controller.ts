import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UserRole } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCategoryDTO } from 'src/dtos/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() category: CreateCategoryDTO) {
    return this.categoryService.create(category);
  }
  // @Put('/:id')
  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN)
  // @UseInterceptors(FileInterceptor('file'))
  // async update(
  //   @UploadedFile() file,
  //   @Body() updateEstimationDto: UpdateEstimationDto,
  // ) {
  //   await this.estimationService.update(updateEstimationDto);
  //   // Xóa luận lí file cũ và thêm file mới
  //   const oldFile = await this.fileService.getByEstimationId(
  //     updateEstimationDto.id,
  //   );
  //   if (oldFile && updateEstimationDto.isDelete === 'true') {
  //     await this.fileService.deleteFile(oldFile.id, oldFile.updateToken);
  //   }
  //   if (file && updateEstimationDto.isDelete === 'true') {
  //     const fileEstimation = await this.fileService.createFile({
  //       fileName: file.originalname,
  //       fileUUID: file.filename,
  //       description: updateEstimationDto.fileDescription,
  //       estimationId: updateEstimationDto.id,
  //     });
  //     updateEstimationDto['file'] = fileEstimation;
  //   }

  //   // Xử lí công nghệ
  //   const technologies =
  //     await this.technologyService.getTechnologyByEstimationId(
  //       updateEstimationDto.id,
  //     );
  //   const oldTechnologiesDictionary: Record<string, TechnologyDto> = {};
  //   if (technologies.length > 0) {
  //     technologies.forEach((item) => {
  //       oldTechnologiesDictionary[item.id] = item;
  //     });
  //   }

  //   // Nếu không có trong danh sách công nghệ cũ thì tạo mới
  //   for (const item of updateEstimationDto.technologies) {
  //     if (!oldTechnologiesDictionary[item]) {
  //       await this.technologyEstimationService.create({
  //         technologyId: item,
  //         estimationId: updateEstimationDto.id,
  //       });
  //     }
  //   }
  //   // Xóa các công nghệ cũ không có trong danh sách công nghệ mới
  //   const oldTechnologyIds = technologies.map((tech) => tech.id);

  //   const technologiesToDelete = oldTechnologyIds.filter(
  //     (techId) => !updateEstimationDto.technologies.includes(techId),
  //   );
  //   for (const techIdToDelete of technologiesToDelete) {
  //     const technologyEstimationId =
  //       await this.technologyEstimationService.getIdByTechnolyIdAndEstimationId(
  //         techIdToDelete,
  //         updateEstimationDto.id,
  //       );
  //     await this.technologyEstimationService.delete(technologyEstimationId);
  //   }
  //   return {};
  // }

  // @UseGuards(AuthGuard)
  // @Roles(UserRole.ADMIN)
  // @Delete()
  // delete(@Body() deleteEstimationDto: DeleteEstimationDto) {
  //   const { id, updateToken } = deleteEstimationDto;
  //   if (!id || !updateToken) {
  //     throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
  //   }
  //   return this.estimationService.delete(id, updateToken);
  // }
}
