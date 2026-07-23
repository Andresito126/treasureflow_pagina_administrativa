import { useTheme } from '@/core/theme/useTheme';
import { Icon } from '@/shared/ui/Icon';
import { Avatar } from '@/shared/ui/Avatar';
import { useAuth } from '@/features/auth/presentation/useAuth';

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export function Topbar({ title, onMenuClick }: TopbarProps) {
  const { theme, toggle } = useTheme();
  const { session } = useAuth();
  const email = session?.email ?? 'admin@treasureflow.com';

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-stroke bg-card/80 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-content transition-colors hover:bg-page md:hidden"
          aria-label="Abrir menú"
        >
          <Icon name="menu" />
        </button>
        <h1 className="font-display text-xl font-bold text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggle}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-page hover:text-primary"
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} size={22} />
        </button>
        <div className="flex items-center gap-2">
          <Avatar name={email} size={32} tone="bg-secondary text-white" />
          <span className="hidden text-sm font-medium text-content sm:block">{email}</span>
        </div>
      </div>
    </header>
  );
}
