// create-categoria.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  readonly nombre: string;

  @IsOptional()
  @IsString()
  readonly descripcion?: string;
}
