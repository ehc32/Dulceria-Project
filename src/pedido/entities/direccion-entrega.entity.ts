// src/pedidos/entities/direccion-entrega.entity.ts
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class DireccionEntrega {
  @Prop({ required: true })
  direccion: string;

  @Prop()
  latitud?: number;

  @Prop()
  longitud?: number;

  @Prop()
  notas?: string;
}
