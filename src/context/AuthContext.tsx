import { API_PROVIDER } from '@/axios';
import { IProduto } from '@/interface/axios/response/IProduto';
import { IAuthContext, IAuthProviderProps } from '@/interface/context/Auth';
import { createContext, useState } from 'react';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  async function getProdutos() {
    const res = await API_PROVIDER.getProdutos();
    setProdutos(res);
  }

  async function updateProduct(produto: IProduto) {
    await API_PROVIDER.updateProduto(produto);
    getProdutos();
  }

  async function createProduct(produto: IProduto) {
    const res = await API_PROVIDER.createProduto(produto);
    setProdutos([...produtos, res]);

    return res;
  }

  async function deleteProduct(produto: IProduto) {
    await API_PROVIDER.deleteProduto(produto);
    setProdutos(produtos.filter((p) => p.id !== produto.id));
  }

  return (
    <AuthContext.Provider
      value={{
        produtos,
        setProdutos,
        getProdutos,
        updateProduct,
        createProduct,
        deleteProduct
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
