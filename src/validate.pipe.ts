import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(value)) {
      throw new BadRequestException(`参数${metadata.data}错误`);
    }

    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
