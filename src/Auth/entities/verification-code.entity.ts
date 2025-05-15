import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class VerificationCode extends Document {
  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  codigo: string;

  @Prop({ default: false })
  usado: boolean;

  @Prop({ type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000) }) // 15 minutos
  expiracion: Date;
}

export type DocumentVerificationCode = VerificationCode & Document;
export const SchemaVerificationCode = SchemaFactory.createForClass(VerificationCode);
