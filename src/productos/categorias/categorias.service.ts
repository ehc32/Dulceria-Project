import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria, DocumentCategoria } from './entities/categoria.entity';
import { PaginationDto } from 'src/common/dto/pagination';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<DocumentCategoria>,
  ) {}

  async create(dto: CreateCategoriaDto) {
    const categoria = new this.categoriaModel(dto);
    return await categoria.save();
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;

    const [data, total] = await Promise.all([
      this.categoriaModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.categoriaModel.countDocuments().exec(),
    ]);

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const categoria = await this.categoriaModel.findById(id);
    if (!categoria) throw new NotFoundException(`Categoría ID "${id}" no encontrada`);
    return categoria;
  }

  async update(id: string, dto: UpdateCategoriaDto) {
    const categoria = await this.categoriaModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!categoria) throw new NotFoundException(`Categoría ID "${id}" no encontrada`);
    return categoria;
  }

  async remove(id: string) {
    const categoria = await this.categoriaModel.findByIdAndDelete(id);
    if (!categoria) throw new NotFoundException(`Categoría ID "${id}" no encontrada`);
    return { message: 'Categoría eliminada correctamente' };
  }
}
