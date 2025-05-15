import { Types } from 'mongoose';

export interface JwtPayload {
  sub: string;
  rol_id: Types.ObjectId;
}