import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { IOrder } from '@/interface/axios/response/IOrders';
import { OrderEnum } from '@/interface/enums/OrderEnum';
import { Edit, Trash } from 'lucide-react';

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'clienteId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente ID
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <div>{OrderEnum[row.original.status]}</div>;
    }
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total
          {column.getIsSorted() === 'asc'
            ? ' ↑'
            : column.getIsSorted() === 'desc'
              ? ' ↓'
              : ''}
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.original.total.toString());
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount);
      return formatted;
    }
  },
  {
    accessorKey: 'itens',
    header: 'Itens',
    cell: ({ row }) => {
      return <div>{row.original.itens.length} itens</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log('Edit', order)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log('Delete', order)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];
