import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/shared/ui/Icon';
import { useAuth } from '@/features/auth/presentation/useAuth';
import { NAV_ITEMS, ROUTES } from '../routes';

interface SidebarProps {
  /** Called after navigating — used to close the mobile drawer. */
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <div className="flex h-full w-[260px] flex-col bg-secondary py-6 text-white">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-3 px-6">
        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
          <img src="/basurini.svg" alt="TreasureFlow" className="h-full w-full" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold leading-tight">TreasureFlow Admin</h2>
          <p className="text-xs text-white/60">Marketplace Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === ROUTES.dashboard}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold font-display transition-all',
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-white/80 hover:bg-white/10',
              )
            }
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto px-3 pt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold font-display text-white/80 transition-all hover:bg-white/10"
        >
          <Icon name="logout" size={20} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
