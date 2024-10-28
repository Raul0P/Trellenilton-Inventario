import { IFornecedor } from '../axios/response/IFornecedor';
import { IProduto } from '../axios/response/IProduto';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  produtos: IProduto[];
  fornecedor: IFornecedor[];
  setProdutos: (produtos: IProduto[]) => void;
  getProdutos: () => Promise<void>;
  getFornecedor: () => Promise<void>;
  updateProduct: (produto: IProduto) => Promise<void>;
  createProduct: (produto: IProduto) => Promise<IProduto>;
  deleteProduct: (produto: IProduto) => Promise<void>;
  updateFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  createFornecedor: (fornecedor: IFornecedor) => Promise<IFornecedor>;
  deleteFornecedor: (fornecedor: IFornecedor) => Promise<void>;
}
