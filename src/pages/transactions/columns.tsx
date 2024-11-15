import { Button } from '@/components/ui/button';
import { ITransacao } from '@/interface/axios/response/ITransacao';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export const columns = () => {
  const { produtos } = useContext(AuthContext);

  return [
    {
      accessorKey: 'tipo',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Tipo
            {column.getIsSorted() === 'asc'
              ? ' ↑'
              : column.getIsSorted() === 'desc'
                ? ' ↓'
                : ''}
          </Button>
        );
      }
    },
    {
      accessorKey: 'data',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data
            {column.getIsSorted() === 'asc'
              ? ' ↑'
              : column.getIsSorted() === 'desc'
                ? ' ↓'
                : ''}
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('data') as string;
        const [year, day, month] = date.split('-');
        return `${day}/${month}/${year}`;
      }
    },
    {
      accessorKey: 'valor',
      header: 'Valor',
      cell: ({ row }) => `R$ ${row.getValue('valor')}`
    },
    {
      id: 'produto',
      accessorFn: (row) => {
        const produto = produtos.find((p) => p.id === row.produtoId);
        return produto?.name || 'N/A';
      },
      header: 'Produto'
    },
    {
      accessorKey: 'pedidoId',
      header: 'Nº Pedido'
    }
  ];
};
