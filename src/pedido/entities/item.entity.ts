import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Producto } from 'src/productos/entities/producto.entity';

@Schema()
export class PedidoItem {
  @Prop({ type: Types.ObjectId, ref: Producto.name, required: true })
  producto_id: Types.ObjectId;

  @Prop({ required: true })
  cantidad: number;

  @IsOptional()
  @Prop({ required: true })
  precio?: number;
}

export const PedidoItemSchema = SchemaFactory.createForClass(PedidoItem);
export type PedidoItemDocument = PedidoItem & Document;
