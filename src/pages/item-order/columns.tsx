import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IItemPedido } from '@/interface/axios/response/IITemPedido';
import { Edit, Trash } from 'lucide-react';

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
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const itensPedidosC = row.original;

        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Edit', itensPedidosC)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Delete', itensPedidosC)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    }
  ] as ColumnDef<IItemPedido>[];
};
