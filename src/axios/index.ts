import { IProduto } from '@/interface/axios/response/IProduto';
import api from './api-config';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';

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
  }
};
