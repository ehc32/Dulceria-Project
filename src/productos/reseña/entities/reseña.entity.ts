import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Producto } from 'src/productos/entities/producto.entity';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Reseña extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: Producto.name })
  producto_id: Types.ObjectId; 

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  usuario_id: ObjectId; 

  @Prop({ required: true, type: String })
  texto: string; 

  @Prop({ required: true, type: Number, min: 1, max: 5 })
  calificacion: number; 

  @Prop({ default: true })
  estado?: boolean; 
}

export type ReseñaDocument = Reseña & Document;
export const ReseñaSchema = SchemaFactory.createForClass(Reseña);
