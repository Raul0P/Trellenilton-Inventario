import { useState } from 'react';
import { DataTable } from './data-table';
import { columns, Product } from './columns';
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

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0, 'Preço deve ser maior que zero'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  supplier: z.string().min(1, 'Fornecedor é obrigatório'),
  image: z.string().optional()
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([
    {
      id: '1',
      name: 'Product 1',
      price: 19.99,
      description: 'Description for Product 1',
      supplier: 'Supplier A',
      image: 'https://example.com/product1.jpg'
    },
    {
      id: '2',
      name: 'Product 2',
      price: 29.99,
      description: 'Description for Product 2',
      supplier: 'Supplier B',
      image: 'https://example.com/product2.jpg'
    },
    {
      id: '3',
      name: 'Product 3',
      price: 39.99,
      description: 'Description for Product 3',
      supplier: 'Supplier C',
      image: 'https://example.com/product3.jpg'
    },
    {
      id: '4',
      name: 'Product 4',
      price: 49.99,
      description: 'Description for Product 4',
      supplier: 'Supplier D',
      image: 'https://example.com/product4.jpg'
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      supplier: ''
    }
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    form.reset(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setData(data.filter((p) => p.id !== product.id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: ProductFormValues) => {
    if (editingProduct) {
      setData(
        data.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...values, image: values.image || p.image }
            : p
        )
      );
    } else {
      setData([
        ...data,
        {
          id: (data.length + 1).toString(),
          ...values,
          image: values.image || 'default-image.jpg'
        }
      ]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    form.reset();
  };

  const updatedColumns = columns.map((col) => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditProduct(product)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteProduct(product)}
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
      <PageHead title="Produtos" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
      </div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={updatedColumns}
          data={data}
          onAddProduct={handleAddProduct}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleImageUpload} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fornecedor</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Product</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
