import { useContext, useEffect, useState, useMemo } from 'react';
import { DataTable } from './data-table';
import { useColumns } from './columns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Edit, Trash, PlusCircle } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { IOrder } from '@/interface/axios/response/IOrders';
import { OrderEnum } from '@/interface/enums/OrderEnum';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const orderItemSchema = z.object({
  produtoId: z.number({
    required_error: 'Produto é obrigatório',
    invalid_type_error: 'Produto deve ser um número'
  }),
  quantidade: z.number().min(1, 'Quantidade deve ser maior que zero'),
  preco: z.number().min(0, 'Preço deve ser maior ou igual a zero')
});

const ordersSchema = z.object({
  clienteId: z.number({
    required_error: 'Cliente é obrigatório',
    invalid_type_error: 'Cliente deve ser um número'
  }),
  status: z.nativeEnum(OrderEnum),
  total: z.number().optional(),
  itens: z
    .array(orderItemSchema)
    .min(1, 'Adicione pelo menos um item ao pedido')
});

type OrdersFormValues = z.infer<typeof ordersSchema>;

export default function OrdersPage() {
  const {
    order,
    createOrder,
    getOrders,
    deleteOrder,
    updateOrder,
    cliente,
    produtos
  } = useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IOrder | null>(null);
  const [displayTotal, setDisplayTotal] = useState(0);

  const form = useForm<OrdersFormValues>({
    resolver: zodResolver(ordersSchema),
    defaultValues: {
      clienteId: undefined,
      status: OrderEnum.PENDENTE,
      total: 0,
      itens: [{ produtoId: undefined, quantidade: 1, preco: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'itens'
  });

  const watchedItems = form.watch('itens');
  const calculatedTotal = useMemo(() => {
    const itens = form.getValues('itens');
    return itens.reduce(
      (acc, item) => acc + (item.preco ?? 0) * (item.quantidade ?? 0),
      0
    );
  }, [watchedItems, form]);
  const totalItems = useMemo(() => {
    const itens = form.getValues('itens');
    return itens.reduce((acc, item) => acc + (item.quantidade ?? 0), 0);
  }, [form.watch('itens')]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith('itens.')) {
        const itens = form.getValues('itens');
        const total = itens.reduce(
          (acc, item) => acc + (item.preco ?? 0) * (item.quantidade ?? 0),
          0
        );
        form.setValue('total', total, {
          shouldValidate: false,
          shouldDirty: true
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);
  const handleAddOrder = () => {
    setEditingOrder(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEditOrder = (order: IOrder) => {
    setEditingOrder(order);
    form.reset(order);
    setIsDialogOpen(true);
  };

  const handleDeleteOrder = (order: IOrder) => {
    deleteOrder(order);
  };

  const onSubmit = async (values: OrdersFormValues) => {
    try {
      if (editingOrder) {
        await updateOrder({ ...editingOrder, ...values });
      } else {
        await createOrder(values);
      }
      await getOrders();
      setIsDialogOpen(false);
      setEditingOrder(null);
      form.reset();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  };

  const updatedColumns = useColumns().map((col) => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditOrder(order)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteOrder(order)}
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
      <PageHead title="Pedidos" />
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
          <DialogContent className="max-w-2xl">
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
                        onValueChange={(value) => field.onChange(Number(value))}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(OrderEnum).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Itens do Pedido</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        append({
                          produtoId: 0,
                          quantidade: 1,
                          preco: 0
                        })
                      }
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="space-y-4 rounded-lg border border-gray-200 p-4"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name={`itens.${index}.produtoId`}
                          render={({ field: selectField }) => (
                            <FormItem>
                              <FormLabel>Produto</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  selectField.onChange(Number(value));
                                  const selectedProduct = produtos.find(
                                    (p) => p.id === Number(value)
                                  );
                                  if (selectedProduct) {
                                    form.setValue(
                                      `itens.${index}.preco`,
                                      selectedProduct.price,
                                      {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                        shouldTouch: true
                                      }
                                    );

                                    const quantidade = form.getValues(
                                      `itens.${index}.quantidade`
                                    );

                                    const allItems = form.getValues('itens');
                                    const newTotal = allItems.reduce(
                                      (acc, item, i) => {
                                        if (i === index) {
                                          return (
                                            acc +
                                            selectedProduct.price * quantidade
                                          );
                                        }
                                        return (
                                          acc +
                                          (item.preco || 0) *
                                            (item.quantidade || 0)
                                        );
                                      },
                                      0
                                    );

                                    setDisplayTotal(newTotal);

                                    form.setValue('total', newTotal, {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                      shouldTouch: true
                                    });
                                  }
                                }}
                                value={selectField.value?.toString()}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione um produto" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {produtos.map((p) => (
                                    <SelectItem
                                      key={p.id}
                                      value={p.id?.toString() || ''}
                                    >
                                      {p.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`itens.${index}.quantidade`}
                          render={({ field: inputField }) => (
                            <FormItem>
                              <FormLabel>Quantidade</FormLabel>
                              <Input
                                type="number"
                                placeholder="Informe a quantidade"
                                {...inputField}
                                min={1}
                                onChange={(e) => {
                                  const newQuantity = Number(e.target.value);
                                  inputField.onChange(newQuantity);

                                  const allItems = form.getValues('itens');
                                  const newTotal = allItems.reduce(
                                    (acc, item, i) => {
                                      if (i === index) {
                                        return (
                                          acc + (item.preco || 0) * newQuantity
                                        );
                                      }
                                      return (
                                        acc +
                                        (item.preco || 0) *
                                          (item.quantidade || 0)
                                      );
                                    },
                                    0
                                  );

                                  setDisplayTotal(newTotal);
                                  form.setValue('total', newTotal);
                                }}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`itens.${index}.preco`}
                          render={({ field: inputField }) => (
                            <FormItem>
                              <FormLabel>Preço unitário</FormLabel>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                  R$
                                </span>
                                <Input
                                  type="number"
                                  placeholder="0,00"
                                  {...inputField}
                                  className="pl-8"
                                  readOnly
                                  value={inputField.value?.toFixed(2)}
                                />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                        className="mt-2 w-full"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Remover Item
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <FormLabel>Resumo do Pedido</FormLabel>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">
                        Total de Itens
                      </div>
                      <div className="w-full rounded border border-gray-300 p-2 font-bold">
                        {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Valor Total</div>
                      <div className="w-full rounded border border-gray-300 p-2 font-bold">
                        R$ {displayTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Salvar Pedido
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
