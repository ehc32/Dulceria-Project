import { IsString, IsMongoId, IsInt, Min, Max } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateReseñaDto {
  @IsMongoId()
  readonly producto_id: ObjectId; 

  @IsMongoId()
  readonly usuario_id: ObjectId; 

  @IsString()
  readonly texto: string;

  @IsInt()
  @Min(1)
  @Max(5)
  readonly calificacion: number;
}
