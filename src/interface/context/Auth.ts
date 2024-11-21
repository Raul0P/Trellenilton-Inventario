import { ICliente } from '../axios/response/ICliente';
import { IFornecedor } from '../axios/response/IFornecedor';
import { IItemPedido } from '../axios/response/IITemPedido';
import { IOrder } from '../axios/response/IOrders';
import { IProduto } from '../axios/response/IProduto';
import { ITransacao } from '../axios/response/ITransacao';
import { IUsuario } from '../axios/response/IUsuario';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  transacoes: ITransacao[];
  produtos: IProduto[];
  fornecedor: IFornecedor[];
  cliente: ICliente[];
  usuario: IUsuario | undefined;
  order: IOrder[];
  itensPedidos: IItemPedido[];
  getTransacaos: () => Promise<void>;
  createTransacao: (transacao: ITransacao) => Promise<void>;
  deleteTransacao: (transacao: ITransacao) => Promise<void>;
  setProdutos: (produtos: IProduto[]) => void;
  getProdutos: () => Promise<void>;
  getFornecedor: () => Promise<void>;
  getItensPedidos: () => Promise<void>;
  updateItemPedido: (itemPedido: IItemPedido) => Promise<void>;
  updateProduct: (produto: IProduto) => Promise<void>;
  createProduct: (produto: FormData) => Promise<void>;
  deleteProduct: (produto: IProduto) => Promise<void>;
  updateFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  createFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  deleteFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  getCliente: () => Promise<void>;
  updateCliente: (cliente: ICliente) => Promise<void>;
  createCliente: (cliente: ICliente) => Promise<void>;
  deleteCliente: (cliente: ICliente) => Promise<void>;
  createUsuario: (usuario: IUsuario) => Promise<IUsuario | undefined>;
  login: (email: string, password: string) => Promise<IUsuario | undefined>;
  logout: () => void;
  createOrder: (order: IOrder) => Promise<void>;
  getOrders: () => Promise<void>;
  updateOrder: (order: IOrder) => Promise<void>;
  deleteOrder: (order: IOrder) => Promise<void>;
  getOrderByIdCostumer: (id: number) => Promise<void>;
}
