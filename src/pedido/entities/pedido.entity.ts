import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { PedidoItem } from './item.entity';
import { DireccionEntrega } from './direccion-entrega.entity';

@Schema({ timestamps: true })
export class Pedido extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  cliente?: Types.ObjectId;

  @Prop({ type: [PedidoItem], required: true })
  items: PedidoItem[];

  @Prop({ enum: ['pendiente', 'empaquetado', 'confirmado', 'entregado'], default: 'pendiente' })
 estado_pedido: string; 

 @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  empleado_asig: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: DireccionEntrega, required: true })
  direccion_entrega: DireccionEntrega;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
export type PedidoDocument = Pedido & Document;
