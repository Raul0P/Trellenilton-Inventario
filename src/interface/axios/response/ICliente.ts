import { IPedido } from './IPedido';

export interface ICliente {
  id?: number;
  name: string;
  endereco: string;
  cpf_cnpj: string;
  contato: string;
  pedidos?: IPedido[];
  archived: boolean;
}
