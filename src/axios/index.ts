import { IProduto } from '@/interface/axios/response/IProduto';
import api from './api-config';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';
import { IUsuario } from '@/interface/axios/response/IUsuario';

export const API_PROVIDER = {
  getProdutos: async () => {
    const res = await api.get('produto');
    const data: IProduto[] = res.data.data;

    return data;
  },
  updateProduto: async (produto: IProduto) => {
    const res = await api.patch(`produtos/${produto.id}`, produto);
    const data: IProduto = res.data;

    return data;
  },

  createProduto: async (produto: IProduto) => {
    const res = await api.post('produtos', produto);
    const data: IProduto = res.data;

    return data;
  },
  deleteProduto: async (produto: IProduto) => {
    const res = await api.delete(`produtos/${produto.id}`);

    return res.data;
  },
  getFornecedor: async () => {
    const res = await api.get('fornecedor');
    const data: IFornecedor[] = res.data.data;

    return data;
  },
  getFornecedorById: async (id: number) => {
    const res = await api.get(`fornecedor/${id}`);
    const data: IFornecedor = res.data.data;

    return data;
  },
  createFornecedor: async (fornecedor: IFornecedor) => {
    const res = await api.post('fornecedor', fornecedor);
    const data: IFornecedor = res.data;

    return data;
  },
  updateFornecedor: async (fornecedor: IFornecedor) => {
    const res = await api.patch(`fornecedor/${fornecedor.id}`, fornecedor);
    const data: IFornecedor = res.data;

    return data;
  },
  deleteFornecedor: async (fornecedor: IFornecedor) => {
    const res = await api.delete(`fornecedor/${fornecedor.id}`);

    return res.data;
  },
  createUsuario: async (usuario: IUsuario) => {
    const res = await api.post('usuario', usuario);
    const data: IUsuario = res.data;

    return data;
  },
  loginUsuario: async (usuario: IUsuario) => {
    const res = await api.post('auth/login', usuario);
    const data: IUsuario = res.data;

    return data;
  },
  getUsuarioById: async (id: number) => {
    const res = await api.get(`usuario/${id}`);
    const data: IUsuario = res.data.data;

    return data;
  },
  updateUsuario: async (usuario: IUsuario) => {
    const res = await api.patch(`usuario/${usuario.id}`, usuario);
    const data: IUsuario = res.data;

    return data;
  },
  deleteUsuario: async (usuario: IUsuario) => {
    const res = await api.delete(`usuario/${usuario.id}`);

    return res.data;
  }
};
