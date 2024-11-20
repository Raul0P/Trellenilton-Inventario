export interface IPedido {
  id: number;
  data: string;
  clienteId: number;
  status: string;
  total: number;
  itens: { produtoId: number; quantidade: number; preco: number }[];
}
