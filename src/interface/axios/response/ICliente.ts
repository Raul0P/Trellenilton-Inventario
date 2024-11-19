export interface ICliente {
  id?: number;
  name: string;
  endereco: string;
  cpf_cnpj: string;
  contato: string;
  pedidos?: string;
  archived: boolean;
}
