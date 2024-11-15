import { IFornecedor } from '../axios/response/IFornecedor';
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
  usuario: IUsuario | undefined;
  getTransacaos: () => Promise<void>;
  createTransacao: (transacao: ITransacao) => Promise<void>;
  deleteTransacao: (transacao: ITransacao) => Promise<void>;
  setProdutos: (produtos: IProduto[]) => void;
  getProdutos: () => Promise<void>;
  getFornecedor: () => Promise<void>;
  updateProduct: (produto: IProduto) => Promise<void>;
  createProduct: (produto: FormData) => Promise<void>;
  deleteProduct: (produto: IProduto) => Promise<void>;
  updateFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  createFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  deleteFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  createUsuario: (usuario: IUsuario) => Promise<IUsuario | undefined>;
  login: (email: string, password: string) => Promise<IUsuario | undefined>;
  logout: () => void;
}
