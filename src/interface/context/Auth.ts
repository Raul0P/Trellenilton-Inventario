import { IFornecedor } from '../axios/response/IFornecedor';
import { IProduto } from '../axios/response/IProduto';
import { IUsuario } from '../axios/response/IUsuario';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  produtos: IProduto[];
  fornecedor: IFornecedor[];
  usuario: IUsuario | null;
  setProdutos: (produtos: IProduto[]) => void;
  getProdutos: () => Promise<void>;
  getFornecedor: () => Promise<void>;
  updateProduct: (produto: IProduto) => Promise<void>;
  createProduct: (produto: IProduto) => Promise<void>;
  deleteProduct: (produto: IProduto) => Promise<void>;
  updateFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  createFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  deleteFornecedor: (fornecedor: IFornecedor) => Promise<void>;
  createUsuario: (usuario: IUsuario) => Promise<IUsuario | undefined>;
  loginUsuario: (usuario: IUsuario) => Promise<IUsuario | undefined>;
}
