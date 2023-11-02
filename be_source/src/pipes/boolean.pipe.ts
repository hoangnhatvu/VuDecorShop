import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class BooleanPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      if (value.toLowerCase() === '1') {
        return true;
      }
      if (value.toLowerCase() === '0') {
        return false;
      }
    }
    throw new BadRequestException('Invalid boolean value');
  }
}
