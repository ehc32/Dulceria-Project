import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { Reseña, ReseñaDocument } from './entities/reseña.entity';

@Injectable()
export class ReseñasService {
  constructor(
    @InjectModel(Reseña.name) private readonly reseñaModel: Model<ReseñaDocument>
  ) {}

  async create(createReseñaDto: CreateReseñaDto) {
    const reseña = new this.reseñaModel(createReseñaDto);
    return await reseña.save();
  }

  async findAll() {
    return this.reseñaModel.find().exec();
  }

  async findByProducto(productoId: string) {
    return this.reseñaModel
      .find({ producto_id: productoId })
      .sort({ createdAt: -1 }) 
      .exec();
  }

  async update(id: string, updateReseñaDto: UpdateReseñaDto) {
    const reseña = await this.reseñaModel.findByIdAndUpdate(id, updateReseñaDto, { new: true });
    if (!reseña) throw new NotFoundException(`Reseña con ID "${id}" no encontrada`);
    return reseña;
  }

  async remove(id: string) {
    const reseña = await this.reseñaModel.findByIdAndDelete(id);
    if (!reseña) throw new NotFoundException(`Reseña con ID "${id}" no encontrada`);
    return { message: 'Reseña eliminada correctamente' };
  }
  
  
}
