import {
    IsString,
    IsOptional,
    IsNumber,
    IsLatitude,
    IsLongitude,
  } from 'class-validator';
  
  export class DireccionEntregaDto {
    @IsString()
    direccion: string;
  
    @IsOptional()
    @IsNumber()
    @IsLatitude()
    latitud?: number;
  
    @IsOptional()
    @IsNumber()
    @IsLongitude()
    longitud?: number;
  
    @IsOptional()
    @IsString()
    notas?: string;
  }
  