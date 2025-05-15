import { Module } from '@nestjs/common';
import { ReseñasService } from './reseña.service';
import { ReseñasController } from './reseña.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reseña, ReseñaSchema } from './entities/reseña.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reseña.name, schema: ReseñaSchema }])],
  controllers: [ReseñasController],
  providers: [ReseñasService],
})
export class ReseñaModule {}
