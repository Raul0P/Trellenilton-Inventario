import { IProduto } from '@/interface/axios/response/IProduto';
import api from './api-config';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';
import { IUsuario } from '@/interface/axios/response/IUsuario';
import { ILoginResponse } from '@/interface/axios/response/ILoginResponse';
import { IOrder } from '@/interface/axios/response/IOrders';

export const API_PROVIDER = {
  getProdutos: async () => {
    const res = await api.get('produto');
    const data: IProduto[] = res.data.data;

    return data;
  },
  updateProduto: async (produto: IProduto) => {
    const res = await api.patch(`produto/${produto.id}`, produto);
    const data: IProduto = res.data;

    return data;
  },

  createProduto: async (produto: FormData) => {
    const res = await api.post('produto/', produto, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const data: IProduto = res.data;

    return data;
  },
  deleteProduto: async (produto: IProduto) => {
    const res = await api.delete(`produto/${produto.id}`);

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
    const res = await api.post('user', usuario);
    const data: IUsuario = res.data;

    return data;
  },
  loginUsuario: async (email: string, password: string) => {
    const res = await api.post('user/login', { email, password });
    const data: ILoginResponse = res.data.data;

    return data;
  },
  getUsuarioById: async (id: number) => {
    const res = await api.get(`user/${id}`);
    const data: IUsuario = res.data.data;

    return data;
  },
  updateUsuario: async (usuario: IUsuario) => {
    const res = await api.patch(`user/${usuario.id}`, usuario);
    const data: IUsuario = res.data;

    return data;
  },
  deleteUsuario: async (usuario: IUsuario) => {
    const res = await api.delete(`user/${usuario.id}`);

    return res.data;
  },
  createOrder: async (order: IOrder) => {
    const res = await api.post('pedido', order);
    const data: IOrder = res.data;

    return data;
  },
  getOrderById: async (id: number) => {
    const res = await api.get(`pedido/${id}`);
    const data: IOrder = res.data.data;

    return data;
  },
  getOrderByIdCosutmer: async (id: number) => {
    const res = await api.get(`pedido/cliente/${id}`);
    const data: IOrder[] = res.data.data;

    return data;
  },
  updateOrder: async (order: IOrder) => {
    const res = await api.patch(`pedido/${order.id}`, order);
    const data: IOrder = res.data;

    return data;
  },
  deleteOrder: async (order: IOrder) => {
    const res = await api.delete(`pedido/${order.id}`);

    return res.data;
  }
};
