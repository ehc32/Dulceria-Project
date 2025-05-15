import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  @IsString()
  producto_id: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  previousImages?: string[];
}
