import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DocumentRole, Role } from './entities/role.entity';
import { PaginationDto } from 'src/common/dto/pagination';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<DocumentRole>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = new this.roleModel(createRoleDto);
    return await newRole.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<{ roles: Role[]; total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [roles, total] = await Promise.all([
      this.roleModel.find().skip(skip).limit(limit).exec(),
      this.roleModel.countDocuments(),
    ]);

    return { roles, total };
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id);
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
    });
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.roleModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Role with id ${id} not found`);
    return { message: `Role with id ${id} deleted successfully` };
  }
}
