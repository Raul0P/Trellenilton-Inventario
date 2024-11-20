import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { ICliente } from '@/interface/axios/response/ICliente';

export const columns: ColumnDef<ICliente>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
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
    )
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
    accessorKey: 'cpf_cnpj',
    header: 'CPF/CNPJ'
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
