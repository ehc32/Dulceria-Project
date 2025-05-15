import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidosService } from './pedido.service';
import { PedidosController } from './pedido.controller';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { PedidoItem, PedidoItemSchema } from './entities/item.entity';
import { Producto, ProductoSchema } from '../productos/entities/producto.entity';
import { User, SchemaUser } from '../users/entities/user.entity';
import { AuthModule } from '../Auth/auth.module';
import { Role, SchemaRole } from '../roles/entities/role.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema },
      { name: PedidoItem.name, schema: PedidoItemSchema },
      { name: Producto.name, schema: ProductoSchema },
      { name: User.name, schema: SchemaUser },
      { name: Role.name, schema: SchemaRole },
    ]),
    AuthModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidoModule {}
