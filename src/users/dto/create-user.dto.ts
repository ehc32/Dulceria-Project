import { IsString, IsEmail, IsOptional, IsBoolean, IsMongoId, IsEnum } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateUserDto {
  @IsString()
  readonly nombre: string;

  @IsString()
  readonly telefono: string;

  @IsEmail()
  readonly correo: string;

  @IsString()
  readonly contrasena: string;

  @IsOptional()
  @IsBoolean()
  readonly state?: boolean;

//Segun el tipo de tiene cierto cosas
  @IsEnum({ enum: ['Natural ', 'Premiun'], default: 'Natural' })
  readonly Type?: string

  @IsMongoId()
  readonly rol_id: ObjectId;
}
