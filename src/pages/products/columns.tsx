import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  supplier: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'price',
    header: 'Preço'
  },
  {
    accessorKey: 'description',
    header: 'Descrição'
  },
  {
    accessorKey: 'supplier',
    header: 'Fornecedor'
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button
        variant="outline"
        onClick={() => console.log('Delete', row.original)}
      >
        Deletar
      </Button>
    )
  }
];
