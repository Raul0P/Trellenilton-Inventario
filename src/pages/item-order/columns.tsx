import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IItemPedido } from '@/interface/axios/response/IITemPedido';

export const columns = () => {
  const { produtos } = useContext(AuthContext);
  return [
    {
      accessorKey: 'pedidoId',
      header: 'ID do Pedido',
      cell: ({ row }) => {
        const pedidoId = row.original.pedidoId;
        return pedidoId || 'Pedido não encontrado';
      }
    },
    {
      accessorKey: 'produtoId',
      header: 'Produto',
      cell: ({ row }) => {
        const produtoId = row.original.produtoId;
        const produtoName = produtos.find((p) => p.id === produtoId)?.name;
        return produtoName || 'Produto não encontrado';
      }
    },
    {
      accessorKey: 'quantidade',
      header: 'Quantidade',
      cell: ({ row }) => {
        const quantidade = row.original.quantidade;
        return quantidade || 'quantidade não encontrado';
      }
    },
    {
      accessorKey: 'preco',
      header: 'Preço',
      cell: ({ row }) => {
        const preco = row.original.precoUnitario;
        return preco || 'preço não encontrado';
      }
    }
  ] as ColumnDef<IItemPedido>[];
};
