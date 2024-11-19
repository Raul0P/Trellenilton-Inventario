import { OrderEnum } from '@/interface/enums/OrderEnum';
import { IOrderItens } from './IOrdersItens';

export interface IOrder {
  id?: number;
  clienteId: number;
  status: OrderEnum;
  total: number;
  itens: IOrderItens[];
}
