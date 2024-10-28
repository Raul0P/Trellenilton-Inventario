import { API_PROVIDER } from '@/axios';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';
import { IProduto } from '@/interface/axios/response/IProduto';
import { IAuthContext, IAuthProviderProps } from '@/interface/context/Auth';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [fornecedor, setFornecedor] = useState<IFornecedor[]>([]);

  async function getProdutos() {
    const res = await API_PROVIDER.getProdutos();
    setProdutos(res);
  }

  async function getFornecedor() {
    const res = await API_PROVIDER.getFornecedor();
    setFornecedor(res);
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

  async function updateFornecedor(fornecedor: IFornecedor) {
    await API_PROVIDER.updateFornecedor(fornecedor);
    getFornecedor();
  }

  async function createFornecedor(fornecedores: IFornecedor) {
    const res = await API_PROVIDER.createFornecedor(fornecedores);
    setFornecedor([...fornecedor, res]);

    return res;
  }

  async function deleteFornecedor(fornecedores: IFornecedor) {
    await API_PROVIDER.deleteFornecedor(fornecedores);
    setFornecedor(fornecedor.filter((f) => f.id !== fornecedores.id));
  }

  useEffect(() => {
    getProdutos();
    getFornecedor();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        produtos,
        fornecedor,
        setProdutos,
        getProdutos,
        getFornecedor,
        updateProduct,
        createProduct,
        deleteProduct,
        updateFornecedor,
        createFornecedor,
        deleteFornecedor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
