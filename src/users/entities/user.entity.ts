import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Role } from "src/roles/entities/role.entity";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop({ default: true })
  state?: boolean;

  @Prop({ enum: ['Natural ','Premiun'], default: 'Natural' })
  Type? : string
  
  @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
 rol_id: Types.ObjectId;

}

export type DocumentUser = User & Document;
export const SchemaUser = SchemaFactory.createForClass(User);
