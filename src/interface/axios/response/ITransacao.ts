export interface ITransacao {
  id?: number;
  tipo: string;
  data: string;
  valor: number;
  produtoId: number;
  pedidoId: number;
}
