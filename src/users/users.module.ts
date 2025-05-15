import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaUser, User } from './entities/user.entity';

@Module({
  imports : [
    MongooseModule.forFeature([
      {name : User.name , schema : SchemaUser}
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule]
})
export class UsersModule {}
