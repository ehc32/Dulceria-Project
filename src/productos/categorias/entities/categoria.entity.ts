import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Categoria extends Document {
  @Prop({ required: true, unique: true })
  nombre: string;

  @Prop()
  descripcion?: string;
}

export type DocumentCategoria = Categoria & Document;
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
