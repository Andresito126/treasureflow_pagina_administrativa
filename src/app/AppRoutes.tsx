import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { AdminLayout } from './layout/AdminLayout';
import { LoginPage } from '@/features/auth/presentation/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/presentation/pages/DashboardPage';
import { UsersPage } from '@/features/users/presentation/pages/UsersPage';
import { PostsPage } from '@/features/posts/presentation/pages/PostsPage';
import { CollectionsPage } from '@/features/collections/presentation/pages/CollectionsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.users} element={<UsersPage />} />
        <Route path={ROUTES.posts} element={<PostsPage />} />
        <Route path={ROUTES.collections} element={<CollectionsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}
