import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;
}

export const SchemaRole = SchemaFactory.createForClass(Role);
export type DocumentRole = Role & Document;
