import { IsArray, IsMongoId, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DireccionEntregaDto } from './direccion-entrega.dto';


export class PedidoItemDto {
  @IsMongoId()
producto_id: string;


  @IsNumber()
  cantidad: number;

  @IsOptional() 
  @IsNumber()
  precio?: number;
}


export class CreatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoItemDto)
  items: PedidoItemDto[];

  @IsOptional()
  cliente?: string;

  @ValidateNested()
  @Type(() => DireccionEntregaDto)
  direccion_entrega: DireccionEntregaDto;
}
