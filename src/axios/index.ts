import { IProduto } from '@/interface/axios/response/IProduto';
import api from './api-config';

export const API_PROVIDER = {
  getProdutos: async () => {
    const res = await api.get('produtos');
    const data: IProduto[] = res.data;

    return data;
  },
  updateProduto: async (produto: IProduto) => {
    const res = await api.patch(`produtos/${produto.id}`, produto);
    const data: IProduto = res.data;

    return data;
  }
};
