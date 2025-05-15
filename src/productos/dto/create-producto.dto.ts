import { Type } from '@nestjs/common';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  IsMongoId,
  IsBoolean,
  IsArray,
  isMongoId
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsMongoId()
  categoria_id: ObjectId;

  @IsMongoId()
  Rewiew_id: ObjectId;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technicalSpecifications?: string[];
}
