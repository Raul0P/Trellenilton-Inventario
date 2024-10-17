import { useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductsPage() {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Product 1',
      price: 19.99,
      description: 'Description for Product 1',
      supplier: 'Supplier A'
    },
    {
      id: '2',
      name: 'Product 2',
      price: 29.99,
      description: 'Description for Product 2',
      supplier: 'Supplier B'
    },
    {
      id: '3',
      name: 'Product 3',
      price: 39.99,
      description: 'Description for Product 3',
      supplier: 'Supplier D'
    },
    {
      id: '4',
      name: 'Product 4',
      price: 49.99,
      description: 'Description for Product 4',
      supplier: 'Supplier D'
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    supplier: ''
  });

  const handleAddProduct = () => {
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    setData([...data, { id: (data.length + 1).toString(), ...newProduct }]);
    setIsDialogOpen(false);
    setNewProduct({ name: '', price: 0, description: '', supplier: '' });
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        onAddProduct={handleAddProduct}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Produto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Nome"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Preço"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value)
                })
              }
            />
            <Input
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Input
              placeholder="Supplier"
              value={newProduct.supplier}
              onChange={(e) =>
                setNewProduct({ ...newProduct, supplier: e.target.value })
              }
            />
          </div>
          <Button onClick={handleSaveProduct}>Save Product</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
