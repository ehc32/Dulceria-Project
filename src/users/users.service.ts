import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination';
import { DocumentUser, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<DocumentUser>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
  
    const skip = (page - 1) * limit;
  
    const [users, total] = await Promise.all([
      this.userModel
        .find()
        .populate('rol_id', 'nombre')
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments().exec(),
    ]);
  
    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .populate('rol_id', 'nombre');
    if (!user) throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
    return { message: 'Usuario eliminado correctamente' };
  }
}
