import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';
import { NAV_ITEMS } from '../routes';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

function useSectionTitle(): string {
  const { pathname } = useLocation();
  const match = NAV_ITEMS.find((item) =>
    item.path === '/' ? pathname === '/' : pathname.startsWith(item.path),
  );
  return match?.label ?? 'Dashboard';
}

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const title = useSectionTitle();

  return (
    <div className="min-h-screen bg-page">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden md:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden',
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity',
            drawerOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            'absolute inset-y-0 left-0 transition-transform',
            drawerOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </aside>
      </div>

      {/* Content */}
      <div className="md:pl-[260px]">
        <Topbar title={title} onMenuClick={() => setDrawerOpen(true)} />
        <main className="mx-auto max-w-container px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
