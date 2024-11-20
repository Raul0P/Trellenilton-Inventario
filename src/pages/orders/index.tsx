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
import InputMask from 'react-input-mask';
import { IOrder } from '@/interface/axios/response/IOrders';

import { OrderEnum } from '@/interface/enums/OrderEnum';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const ordersSchema = z.object({
  clienteId: z.number({
    required_error: 'Cliente é obrigatório',
    invalid_type_error: 'Cliente deve ser um número'
  }),
  status: z.nativeEnum(OrderEnum),
  total: z.number(),
  itens: z
    .array(
      z.object({
        produtoId: z.number(),
        quantidade: z.number(),
        preco: z.number()
      })
    )
    .default([])
});

type OrdersFormValues = z.infer<typeof ordersSchema>;

export default function OrdersPage() {
  const {
    order,
    createOrder,
    getOrders,
    getOrderByIdCostumer,
    deleteOrder,
    updateOrder,
    cliente
  } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IOrder | null>(null);

  const form = useForm<OrdersFormValues>({
    resolver: zodResolver(ordersSchema),
    defaultValues: {
      clienteId: 0,
      status: OrderEnum.PENDENTE,
      total: 0,
      itens: []
    }
  });

  const handleAddOrder = () => {
    setEditingOrder(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEditingOrder = (orders: IOrder) => {
    setEditingOrder(orders);
    form.reset(orders);
    setIsDialogOpen(true);
  };

  const handleDeleteOrder = (orders: IOrder) => {
    deleteOrder(orders);
  };

  const onSubmit = async (values: OrdersFormValues) => {
    if (editingOrder) {
      await updateOrder({ ...editingOrder, ...values });
    } else {
      await createOrder(values);
    }
    await getOrders();
    setIsDialogOpen(false);
    setEditingOrder(null);
    form.reset();
  };

  const updatedColumns = columns().map((col) => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }) => {
          const orders = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditingOrder(orders)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteOrder(orders)}
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
      <PageHead title="Order" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
      </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={updatedColumns}
          data={order}
          ondAddOrder={handleAddOrder}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOrder ? 'Editar Pedido' : 'Criar Novo Pedido'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="clienteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cliente.map((c) => (
                            <SelectItem
                              key={c.id}
                              value={c.id?.toString() || ''}
                            >
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}