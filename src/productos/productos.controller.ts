import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common/dto/pagination';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
  @Get('/categoria/:categoriaId')
  findByCategoria(
    @Param('categoriaId') categoriaId: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.productosService.findByCategoria(categoriaId, paginationDto);
  }
@Get(':id/similares')
findSimilares(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
  return this.productosService.findSimilares(id, paginationDto);
}

}



