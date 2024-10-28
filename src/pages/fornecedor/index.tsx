import { useContext, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import PageHead from '@/components/shared/page-head';
import { Edit, Trash } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { IFornecedor } from '@/interface/axios/response/IFornecedor';

const fornecedorSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  contato: z.string().min(1, 'Contato é obrigatórip'),
  cnpj: z.string().min(1, 'CNPJ é obrigatório')
});

type FornecedorFormValues = z.infer<typeof fornecedorSchema>;

export default function FornecedorPage() {
  const { fornecedor, createFornecedor, updateFornecedor, deleteFornecedor } =
    useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFornecedor, setEditingFornecedor] =
    useState<IFornecedor | null>(null);

  const form = useForm<FornecedorFormValues>({
    resolver: zodResolver(fornecedorSchema),
    defaultValues: {
      name: '',
      endereco: '',
      contato: '',
      cnpj: ''
    }
  });

  const handleAddFornecedor = () => {
    setEditingFornecedor(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEditFornecedor = (fornecedor: IFornecedor) => {
    setEditingFornecedor(fornecedor);
    form.reset(fornecedor);
    setIsDialogOpen(true);
  };

  const handleDeleteFornecedor = (fornecedor: IFornecedor) => {
    deleteFornecedor(fornecedor);
  };

  const onSubmit = (values: FornecedorFormValues) => {
    if (editingFornecedor) {
      updateFornecedor({ ...editingFornecedor, ...values });
    } else {
      createFornecedor(values);
    }
    setIsDialogOpen(false);
    setEditingFornecedor(null);
    form.reset();
  };

  const updatedColumns = columns.map((col) => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }) => {
          const fornecedor = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditFornecedor(fornecedor)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteFornecedor(fornecedor)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          );
        }
      };
    }
    return col;
  });

  return (
    <>
      <PageHead title="Fornecedor" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Fornecedor</h2>
      </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={updatedColumns}
          data={fornecedor}
          onAddFornecedor={handleAddFornecedor}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFornecedor
                  ? 'Editar Fornecedor'
                  : 'Adicionar Novo Fornecedor'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>endereco</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contato"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>contato</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Salvar Fornecedor</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
