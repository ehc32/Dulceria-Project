import { Controller, Post, Get, Patch, Body, Param, Request, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoEstadoDto } from './dto/update-pedido.dto';
import { JwtAuthGuard } from 'src/Auth/guards/jwt-auth.guard';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Endpoint para crear un nuevo pedido
  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }
  // Endpoint para obtener los pedidos de un cliente por su clienteId
  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId') clienteId: string) {
    return this.pedidosService.findByCliente(clienteId); // Buscar pedidos por clienteId
  }

  // Endpoint para obtener los pedidos por estado (pendiente, empaquetado, etc.)
  @Get('estado/:estado')
  findByEstado(@Param('estado') estado: string) {
    return this.pedidosService.findByEstado(estado);
  }

  // Endpoint para actualizar el estado de un pedido
  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body() dto: UpdatePedidoEstadoDto) {
    return this.pedidosService.updateEstado(id, dto);
  }

  // Endpoint para confirmar la entrega de un pedido
  @Patch(':id/confirmar')
  confirmarEntrega(@Param('id') id: string) {
    return this.pedidosService.confirmarEntrega(id);
  }
  @Patch(':id/asignar')
asignarEmpleado(@Param('id') id: string) {
  return this.pedidosService.asignarEmpleado(id);
}
@UseGuards(JwtAuthGuard)

@Patch(':id/confirmar-empleado')
confirmarPorEmpleado(@Param('id') id: string, @Request() req) {
  const empleadoId = req.user._id;
  return this.pedidosService.confirmarPorEmpleado(id, empleadoId);
}

}
