// productos.module.ts
import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { CategoriasModule } from './categorias/categorias.module';
import { ReseñaModule } from './reseña/reseña.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema }
    ]),
    CategoriasModule,
    ReseñaModule
  ],
  
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}