import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Reseña } from '../reseña/entities/reseña.entity';


@Schema({ timestamps: { createdAt: 'creado_en', updatedAt: 'actualizado_en' } })
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion?: string;

  @Prop({ required: true, type: Number })
  precio: number;

  @Prop({ required: true, type: Number })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: Categoria.name, required: true })
  categoria_id: Types.ObjectId;

  @Prop({ default: true })
  estado?: boolean;

  @Prop({ type: [String], default: [] })
  imagen_url?: string[];


  @Prop({ required: true, type : Types.ObjectId, ref: Reseña.name })
  Rewiew_id : ObjectId

  @Prop()
  marca?: string;
  
  @Prop()
  sku?: string;

  @Prop({ type: [String], default: [] })
  technicalSpecifications?: string[];
}

export type ProductoDocument = Producto & Document;
export const ProductoSchema = SchemaFactory.createForClass(Producto);
