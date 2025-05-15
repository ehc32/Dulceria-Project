import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductosModule } from './productos/productos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { PedidoModule } from './pedido/pedido.module';
import { AuthModule } from './Auth/auth.module';
import { MailModule } from './Auth/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/PLT-Dulceria', {
      dbName: 'PLT-Dulceria',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
    RolesModule,
    ProductosModule,
    PedidoModule,
    AuthModule,
    MailModule,
  ],  
  controllers: [],
  providers: [],
})
export class AppModule {}