import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, SchemaRole } from './entities/role.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name : Role.name , schema : SchemaRole }
    ])
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
