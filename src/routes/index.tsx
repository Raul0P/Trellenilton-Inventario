import { ProtectedRoute } from '@/components/ProtectedRoute';
import SignupPage from '@/pages/auth/signup';
import ClientesPage from '@/pages/cliente';
import FormPage from '@/pages/form';
import FornecedorPage from '@/pages/fornecedor';
import NotFound from '@/pages/not-found';
import OrdersPage from '@/pages/orders';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));

const ProductsPage = lazy(() => import('@/pages/products'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path: 'products',
          element: <ProductsPage />
        },
        {
          path: 'fornecedor',
          element: <FornecedorPage />
        },
        {
          path: 'cliente',
          element: <ClientesPage />
        },
        {
          path: 'pedido',
          element: <OrdersPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path: '/signup',
      element: <SignupPage />
    },
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    }
  ];
  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
