import { API_PROVIDER } from '@/axios';
import { useToast } from '@/components/ui/use-toast';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';
import { IProduto } from '@/interface/axios/response/IProduto';
import { IAuthContext, IAuthProviderProps } from '@/interface/context/Auth';
import { createContext, useEffect, useState } from 'react';
import { ToastAction } from '@/components/ui/toast';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [fornecedor, setFornecedor] = useState<IFornecedor[]>([]);
  const { toast } = useToast();

  async function getProdutos() {
    try {
      const res = await API_PROVIDER.getProdutos();
      if (res) {
        toast({
          title: 'Produtos carregados com sucesso',
          description: 'Produtos carregados com sucesso'
        });
        setProdutos(res);
      } else {
        toast({
          title: 'Erro ao carregar produtos',
          description: 'Erro ao carregar produtos',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar produtos',
        description: 'Erro ao carregar produtos',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function getFornecedor() {
    try {
      const res = await API_PROVIDER.getFornecedor();
      if (res) {
        toast({
          title: 'Fornecedores carregados com sucesso',
          description: 'Fornecedores carregados com sucesso'
        });
        setFornecedor(res);
      } else {
        toast({
          title: 'Erro ao carregar fornecedores',
          description: 'Erro ao carregar fornecedores',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar fornecedores',
        description: 'Erro ao carregar fornecedores',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function updateProduct(produto: IProduto) {
    try {
      const req = await API_PROVIDER.updateProduto(produto);
      if (req) {
        toast({
          title: 'Produto atualizado com sucesso',
          description: 'Produto atualizado com sucesso'
        });
        getProdutos();
      } else {
        toast({
          title: 'Erro ao atualizar produto',
          description: 'Erro ao atualizar produto',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar produto',
        description: 'Erro ao atualizar produto',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function createProduct(produto: IProduto) {
    try {
      const res = await API_PROVIDER.createProduto(produto);
      if (res) {
        toast({
          title: 'Produto criado com sucesso',
          description: 'Produto criado com sucesso'
        });
        setProdutos([...produtos, res]);
      } else {
        toast({
          title: 'Erro ao criar produto',
          description: 'Erro ao criar produto',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar produto',
        description: 'Erro ao criar produto',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function deleteProduct(produto: IProduto) {
    try {
      const res = await API_PROVIDER.deleteProduto(produto);
      if (res) {
        toast({
          title: 'Produto deletado com sucesso',
          description: 'Produto deletado com sucesso'
        });
        setProdutos(produtos.filter((p) => p.id !== produto.id));
      } else {
        toast({
          title: 'Erro ao deletar produto',
          description: 'Erro ao deletar produto',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao deletar produto',
        description: 'Erro ao deletar produto',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function updateFornecedor(fornecedor: IFornecedor) {
    try {
      const res = await API_PROVIDER.updateFornecedor(fornecedor);
      if (res) {
        toast({
          title: 'Fornecedor atualizado com sucesso',
          description: 'Fornecedor atualizado com sucesso'
        });
        getFornecedor();
      } else {
        toast({
          title: 'Erro ao atualizar fornecedor',
          description: 'Erro ao atualizar fornecedor',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar fornecedor',
        description: 'Erro ao atualizar fornecedor',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function createFornecedor(fornecedores: IFornecedor) {
    try {
      const res = await API_PROVIDER.createFornecedor(fornecedores);
      if (res) {
        toast({
          title: 'Fornecedor criado com sucesso',
          description: 'Fornecedor criado com sucesso'
        });
        setFornecedor([...fornecedor, res]);
      } else {
        toast({
          title: 'Erro ao criar fornecedor',
          description: 'Erro ao criar fornecedor',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar fornecedor',
        description: 'Erro ao criar fornecedor',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function deleteFornecedor(fornecedores: IFornecedor) {
    try {
      const res = await API_PROVIDER.deleteFornecedor(fornecedores);
      if (res) {
        toast({
          title: 'Fornecedor deletado com sucesso',
          description: 'Fornecedor deletado com sucesso'
        });
        setFornecedor(fornecedor.filter((f) => f.id !== fornecedores.id));
      } else {
        toast({
          title: 'Erro ao deletar fornecedor',
          description: 'Erro ao deletar fornecedor',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao deletar fornecedor',
        description: 'Erro ao deletar fornecedor',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
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
