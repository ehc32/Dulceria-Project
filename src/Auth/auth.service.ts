import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, DocumentUser } from '../users/entities/user.entity';
import { RegisterUserDto, LoginUserDto } from './dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from './mail/mail.service';

@Injectable()
export class AuthService {
  private readonly codigos = new Map(); 

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<DocumentUser>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) { }

  async register(dto: RegisterUserDto) {
    const userExists = await this.userModel.findOne({ correo: dto.correo });
    if (userExists) throw new BadRequestException('El correo ya está en uso');

    const hash = await bcrypt.hash(dto.contrasena, 10);
    const user = new this.userModel({ ...dto, contrasena: hash });
    return user.save();
  }

  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({ correo: dto.correo });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const valid = await bcrypt.compare(dto.contrasena, user.contrasena);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user._id, rol_id: user.rol_id };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userModel.findOne({ correo: dto.correo });
    if (!user) throw new NotFoundException('Correo no registrado');

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    this.codigos.set(dto.correo, codigo);

    await this.mailService.sendResetCode(dto.correo, codigo);

    return { mensaje: 'Código enviado al correo' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userModel.findOne({ correo: dto.correo });
    if (!user) throw new NotFoundException('Correo no registrado');
  
    const codigoGuardado = this.codigos.get(dto.correo);
    if (!codigoGuardado || codigoGuardado !== dto.codigo) {
      throw new BadRequestException('Código incorrecto o expirado');
    }
  
    // Código válido: lo eliminamos inmediatamente
    this.codigos.delete(dto.correo);
  
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.nuevaContrasena, salt);
    user.contrasena = hash;
    await user.save();
  
    return { mensaje: 'Contraseña actualizada con éxito' };
  }
}  
