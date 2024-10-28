import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';

export const columns: ColumnDef<IFornecedor>[] = [
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
    accessorKey: 'endereco',
    header: 'Endereço'
  },
  {
    accessorKey: 'contato',
    header: 'Contato'
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
