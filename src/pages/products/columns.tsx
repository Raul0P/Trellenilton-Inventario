import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const columns = () => {
  const { fornecedor } = useContext(AuthContext);

  return [
    {
      accessorKey: 'image',
      header: 'Imagem',
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          width={50}
          height={50}
        />
      )
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
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
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Preço
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
      accessorKey: 'quantity',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Quantidade
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
      accessorKey: 'description',
      header: 'Descrição'
    },
    {
      id: 'supplier',
      accessorFn: (row) => {
        const supplier = fornecedor.find((f) => f.id === row.fornecedorId);
        return supplier?.name || 'N/A';
      },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Fornecedor
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
        const product = row.original;

        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Edit', product)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => console.log('Delete', product)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    }
  ];
};
