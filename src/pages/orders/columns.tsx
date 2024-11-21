import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
export const useColumns = () => {
  const { produtos, cliente } = useContext(AuthContext);
  return [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'clienteId',
      header: 'Cliente',
      cell: ({ row }) => {
        const clienteId = row.original.clienteId;
        const clienteName = cliente.find((c) => c.id === clienteId)?.name;
        return clienteName || 'Cliente não encontrado';
      }
    },
    {
      accessorKey: 'status',
      header: 'Status'
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const total = row.original.total;
        return `R$ ${total?.toFixed(2) || '0.00'}`;
      }
    },
    {
      accessorKey: 'itens',
      header: 'Itens',
      cell: ({ row }) => {
        const itens = row.original.itens;
        if (!itens || !Array.isArray(itens)) return '-';

        return itens.map((item) => (
          <div key={item.id} className="text-sm">
            {produtos.find((p) => p.id === item.produtoId)?.name} -{' '}
            {item.quantidade}x
          </div>
        ));
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const cliente = row.original;

        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Edit', cliente)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Delete', cliente)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    }
  ];
};
