import { ICliente } from '../axios/response/ICliente';
import { IFornecedor } from '../axios/response/IFornecedor';
import { IProduto } from '../axios/response/IProduto';
import { IUsuario } from '../axios/response/IUsuario';

export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  produtos: IProduto[];
  fornecedor: IFornecedor[];
  cliente: ICliente[];
  usuario: IUsuario | undefined;
  setProdutos: (produtos: IProduto[]) => void;
  getProdutos: () => Promise<void>;
  getFornecedor: () => Promise<void>;
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
}
