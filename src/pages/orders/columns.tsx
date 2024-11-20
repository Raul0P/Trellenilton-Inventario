import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const columns = () => {
  const { fornecedor, produtos, cliente } = useContext(AuthContext);
  console.log('produtos', produtos);
  return [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Cliente',
      accessor: 'cliente',
      Cell: ({ row }) => {
        return (
          <span>
            {cliente.find((c) => c.id === row.original.cliente)?.name}
          </span>
        );
      }
    },
    {
      Header: 'Fornecedor',
      accessor: 'fornecedor',
      Cell: ({ row }) => {
        return (
          <span>
            {fornecedor.find((f) => f.id === row.original.fornecedor)?.name}
          </span>
        );
      }
    },
    {
      Header: 'Produtos',
      accessor: 'produtos',
      Cell: ({ row }) => {
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
      Header: 'Ações',
      accessor: 'actions',
      Cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => {
                console.log('edit', row.original);
              }}
            >
              <Edit />
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                console.log('delete', row.original);
              }}
            >
              <Trash />
            </Button>
          </div>
        );
      }
    }
  ];
};
