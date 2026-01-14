import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';

export function AdminLayout() {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 transition-all duration-300">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
