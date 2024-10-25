import { IProduto } from '../axios/response/IProduto';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  produtos: IProduto[];
  setProdutos: (produtos: IProduto[]) => void;
  getProdutos: () => Promise<void>;
  updateProduct: (produto: IProduto) => Promise<void>;
  createProduct: (produto: IProduto) => Promise<IProduto>;
  deleteProduct: (produto: IProduto) => Promise<void>;
}
