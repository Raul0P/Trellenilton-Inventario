import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
export const columns = () => {
  const { fornecedor, produtos, cliente } = useContext(AuthContext);
  console.log('produtos', produtos);
  return [
    {
      accessorKey: 'fornecedor',
      header: 'Fornecedor',
      cell: ({ row }) => {
        return (
          <span>
            {fornecedor.find((f) => f.id === row.original.fornecedor)?.name}
          </span>
        );
      }
    },
    {
      accessorKey: 'produtos',
      header: 'Produtos',
      cell: ({ row }) => {
        return (
          <ul>
            {row.original.produtos.map((p) => (
              <li key={p}>{produtos.find((pr) => pr.id === p)?.name}</li>
            ))}
          </ul>
        );
      }
    },
    {
      id: 'cliente',
      accessoFn: (row) => {
        const costumer = cliente.find((c) => c.id === row.original.cliente);
        return costumer?.name || 'Sem cliente';
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cliente
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
