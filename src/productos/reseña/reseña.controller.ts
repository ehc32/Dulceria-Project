import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { ReseñasService } from './reseña.service';
import { NotFoundException } from '@nestjs/common';

@Controller('resenas')
export class ReseñasController {
  constructor(private readonly reseñasService: ReseñasService) {}

  @Post()
  create(@Body() createReseñaDto: CreateReseñaDto) {
    return this.reseñasService.create(createReseñaDto);
  }

  @Get()
  findAll() {
    return this.reseñasService.findAll();
  }

  @Get('/producto/:productoId')
  findByProducto(@Param('productoId') productoId: string) {
    return this.reseñasService.findByProducto(productoId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReseñaDto: UpdateReseñaDto) {
    return this.reseñasService.update(id, updateReseñaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reseñasService.remove(id);
  }
}
