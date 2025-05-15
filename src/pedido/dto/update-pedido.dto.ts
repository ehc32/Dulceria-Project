import { IsString } from 'class-validator';

export class UpdatePedidoEstadoDto {
  @IsString()
  estado_pedido: string; // 'empaquetado', 'enviado', 'entregado', etc.
}
