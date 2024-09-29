import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @IsNotEmpty({ message: '书名不能为空' })
  name: string;

  @IsNotEmpty({ message: '作者不能为空' })
  author: string;

  @IsNotEmpty({ message: '简介不能为空' })
  description: string;

  @IsNotEmpty({ message: '封面不能为空' })
  cover: string;
}
