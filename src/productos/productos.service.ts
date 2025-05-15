import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto, ProductoDocument } from './entities/producto.entity';
import { PaginationDto } from 'src/common/dto/pagination';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private readonly productoModel: Model<ProductoDocument>
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const producto = new this.productoModel(createProductoDto);
    return await producto.save();
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    return this.productoModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const producto = await this.productoModel.findById(id);
    if (!producto) throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoModel.findByIdAndUpdate(id, updateProductoDto, {
      new: true,
    });
    if (!producto) throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    return producto;
  }

  async remove(id: string) {
    const producto = await this.productoModel.findByIdAndDelete(id);
    if (!producto) throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    return { message: 'Producto eliminado correctamente' };
  }
  async findByCategoria(categoriaId: string, paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
  
    const [data, total] = await Promise.all([
      this.productoModel
        .find({ categoria_id: categoriaId })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.productoModel.countDocuments({ categoria_id: categoriaId }).exec(),
    ]);
  
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async findSimilares(productoId: string, paginationDto: PaginationDto) {
    const { limit = 4, page = 1 } = paginationDto;
  
    const producto = await this.productoModel.findById(productoId);
    if (!producto) {
      throw new NotFoundException(`Producto con ID "${productoId}" no encontrado`);
    }
  
    const filter = {
      categoria_id: producto.categoria_id,
      _id: { $ne: producto._id },
    };
  
    const [data, total] = await Promise.all([
      this.productoModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.productoModel.countDocuments(filter).exec(),
    ]);
  
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }


}  