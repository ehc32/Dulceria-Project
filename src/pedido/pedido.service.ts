import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './entities/pedido.entity';
import { Producto, ProductoDocument } from 'src/productos/entities/producto.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoEstadoDto } from './dto/update-pedido.dto';
import { DocumentUser, User } from 'src/users/entities/user.entity';
import { Role, DocumentRole } from 'src/roles/entities/role.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<PedidoDocument>,
    @InjectModel(Producto.name)
    private readonly productoModel: Model<ProductoDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<DocumentUser>,
    @InjectModel(Role .name)
    private readonly roleModel: Model<DocumentRole>,
  ) {}

  async findAll() {
    return this.pedidoModel.find().populate('items.producto_id', 'nombre precio').populate('cliente', 'nombre correo');
  }

  // Método para crear un pedido
  async create(createPedidoDto: CreatePedidoDto) {
    const { items, cliente, direccion_entrega } = createPedidoDto;
    let total = 0;

    // Validar los productos y actualizar el stock
    for (const item of items) {
      const producto = await this.productoModel.findById(item.producto_id);
      if (!producto)
        throw new NotFoundException(`Producto no encontrado: ${item.producto_id}`);

      if (producto.stock < item.cantidad)
        throw new BadRequestException(`Stock insuficiente para ${producto.nombre}`);

      producto.stock -= item.cantidad;
      await producto.save();

      total += producto.precio * item.cantidad;
      item.precio = producto.precio;
    }

    // Crear el pedido
    const pedido = new this.pedidoModel({
      cliente: cliente || null,
      items,
      total,
      estado_pedido: 'pendiente',
      direccion_entrega,
    });

    return pedido.save();
  }

  // Método para obtener los pedidos de un cliente
  async findByCliente(clienteId: string) {
    const pedidos = await this.pedidoModel
      .find({ cliente: clienteId }) // Buscar pedidos por ID del cliente
      .populate('items.producto_id', 'nombre precio') // Llenar los datos del producto
      .populate('cliente', 'nombre correo'); // Llenar los datos del cliente

    if (!pedidos.length) {
      throw new NotFoundException(`Cliente no tiene pedidos`);
    }

    return pedidos;
  }

  // Método para obtener los pedidos con el estado pendiente, empaquetado, o enviado
  async findByEstado(estado: string) {
    const pedidos = await this.pedidoModel
      .find({ estado_pedido: estado })
      .populate('items.producto_id', 'nombre precio')
      .populate('cliente', 'nombre correo');

    if (!pedidos.length) {
      throw new NotFoundException(`No se encontraron pedidos con estado ${estado}.`);
    }

    return pedidos;
  }

  // Método para actualizar el estado de un pedido
  async updateEstado(id: string, dto: UpdatePedidoEstadoDto) {
    const pedido = await this.pedidoModel.findById(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    pedido.estado_pedido = dto.estado_pedido;
    return pedido.save();
  }

  // Método para confirmar la entrega de un pedido
  async confirmarEntrega(id: string) {
    const pedido = await this.pedidoModel.findById(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    pedido.estado_pedido = 'entregado';
    return pedido.save();
  }


  async asignarEmpleado(pedidoId: string) {
    const pedido = await this.pedidoModel.findById(pedidoId);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
  
    // Buscar el rol "empleado"
    const rolEmpleado = await this.roleModel.findOne({ nombre: 'empleado' });
    if (!rolEmpleado) throw new NotFoundException('Rol "empleado" no encontrado');
  
    // Buscar empleados que tengan ese rol
    const empleados = await this.userModel.find({ rol_id: rolEmpleado._id });
    if (!empleados.length) throw new NotFoundException('No hay empleados disponibles');
  
    // Elegir uno aleatorio
    const empleadoRandom = empleados[Math.floor(Math.random() * empleados.length)];
  
    // Asignar el empleado
    pedido.empleado_asig = empleadoRandom._id as any;
    pedido.estado_pedido = 'empaquetado';
    await pedido.save();
  
    return {
      mensaje: `Empleado asignado: ${empleadoRandom.nombre}`,
      pedido,
    };
  }
  

// Confirmación final por el empleado
async confirmarPorEmpleado(pedidoId: string, empleadoId: string) {
  const pedido = await this.pedidoModel.findById(pedidoId);
  if (!pedido) throw new NotFoundException('Pedido no encontrado');

  if (!pedido.empleado_asig || pedido.empleado_asig.toString() !== empleadoId) {
    throw new BadRequestException('No autorizado para confirmar este pedido');
  }

  pedido.estado_pedido = 'confirmado';
  await pedido.save();

  return { mensaje: 'Pedido confirmado', pedido };
}


}
