import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  content!: string;

  @IsOptional()
  imageUrl?: string;
}