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
import { ICliente } from '@/interface/axios/response/ICliente';
import validateCPFOrCNPJ from '@/hooks/use-validator';
import InputMask from 'react-input-mask';
import CPF_CNPJ_Input from '@/hooks/use-docs-input';

const clienteSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  contato: z.string().min(1, 'Contato é obrigatório'),
  cpf_cnpj: z
    .string()
    .min(1, 'CPF ou CNPJ é obrigatório')
    .refine(validateCPFOrCNPJ, {
      message: 'CPF ou CNPJ inválido'
    })
});

type ClienteFormValues = z.infer<typeof clienteSchema>;

export default function ClientesPage() {
  const { cliente, createCliente, updateCliente, deleteCliente, getCliente } =
    useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<ICliente | null>(null);

  const form = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      name: '',
      endereco: '',
      contato: '',
      cpf_cnpj: ''
    }
  });

  const handleAddCliente = () => {
    setEditingCliente(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEditCliente = (cliente: ICliente) => {
    setEditingCliente(cliente);
    form.reset(cliente);
    setIsDialogOpen(true);
  };

  const handleDeleteCliente = (cliente: ICliente) => {
    deleteCliente(cliente);
  };

  const onSubmit = async (values: ClienteFormValues) => {
    if (editingCliente) {
      await updateCliente({ ...editingCliente, ...values });
    } else {
      await createCliente({ ...values, archived: false });
    }
    await getCliente();
    setIsDialogOpen(false);
    setEditingCliente(null);
    form.reset();
  };

  const updatedColumns = columns.map((col) => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }) => {
          const cliente = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditCliente(cliente)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteCliente(cliente)}
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
      <PageHead title="Clientes" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
      </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={updatedColumns}
          data={cliente}
          onAddCliente={handleAddCliente}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCliente ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
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
                      <FormLabel>Endereço</FormLabel>
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
                      <FormLabel>Contato</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf_cnpj"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>CPF ou CNPJ</FormLabel>
                      <FormControl>
                        <InputMask
                          mask={CPF_CNPJ_Input(field.value)}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        >
                          {(inputProps) => <Input {...inputProps} />}
                        </InputMask>
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit">Salvar Cliente</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
