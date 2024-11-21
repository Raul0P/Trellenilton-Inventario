import { useContext } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import PageHead from '@/components/shared/page-head';
import { AuthContext } from '@/context/AuthContext';

export default function ItensOrdersPage() {
  const { itensPedidos } = useContext(AuthContext);
  return (
    <>
      <PageHead title="ItensOrdersPage" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Itens Pedidos</h2>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns()} data={itensPedidos} />
      </div>
    </>
  );
}
