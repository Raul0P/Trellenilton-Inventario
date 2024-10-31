import { API_PROVIDER } from '@/axios';
import { useToast } from '@/components/ui/use-toast';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';
import { IProduto } from '@/interface/axios/response/IProduto';
import { IUsuario } from '@/interface/axios/response/IUsuario';
import { IAuthContext, IAuthProviderProps } from '@/interface/context/Auth';
import { createContext, useEffect, useState } from 'react';
import { ToastAction } from '@/components/ui/toast';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [fornecedor, setFornecedor] = useState<IFornecedor[]>([]);
  const [usuario, setUsuario] = useState<IUsuario | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<IUsuario | undefined> {
    try {
      const res = await API_PROVIDER.loginUsuario(email, password);
      if (res) {
        localStorage.setItem('token', res.token);
        setIsAuthenticated(true);
        setUsuario(res.user);
        return res.user;
      } else {
        toast({
          title: 'Erro ao realizar login',
          description: 'Verifique suas credenciais',
          action: (
            <ToastAction altText="Try again">Tentar Novamente</ToastAction>
          )
        });
      }
      return {} as IUsuario;
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'Erro ao fazer login',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
    }
  }

  async function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsuario(undefined);
  }

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

  async function createUsuario(usuario: IUsuario): Promise<IUsuario> {
    try {
      const res = await API_PROVIDER.createUsuario(usuario);
      if (res) {
        toast({
          title: 'Usuário criado com sucesso',
          description: 'Usuário criado com sucesso'
        });
        return res;
      } else {
        throw new Error('Erro ao criar usuário');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar usuário',
        description: 'Erro ao criar usuário',
        action: <ToastAction altText="Try again">Tentar Novamente</ToastAction>
      });
      throw error;
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
        usuario,
        setProdutos,
        getProdutos,
        getFornecedor,
        updateProduct,
        createProduct,
        deleteProduct,
        updateFornecedor,
        createFornecedor,
        deleteFornecedor,
        createUsuario,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
