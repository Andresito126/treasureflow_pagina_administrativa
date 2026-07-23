import type { FormEvent } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useToast } from '@/shared/toast/useToast';
import { ROUTES } from '@/app/routes';
import { useAuth } from '../useAuth';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Bienvenido de nuevo');
      navigate(ROUTES.dashboard, { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tf-login-pattern flex min-h-screen items-center justify-center bg-page p-4">
      <div className="w-full max-w-[440px] rounded-card border border-stroke bg-card p-10 shadow-card">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Icon name="recycling" size={32} className="text-white" />
          </span>
          <h1 className="font-display text-2xl font-bold text-content">TreasureFlow</h1>
          <p className="mt-1 text-sm text-muted">Panel de administración</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmit}>
          <Input
            id="email"
            type="email"
            label="Correo electrónico"
            icon="mail"
            placeholder="admin@treasureflow.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            icon="lock"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="pointer-events-auto text-muted transition-colors hover:text-content"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-stroke text-primary focus:ring-primary"
              />
              Recordarme
            </label>
            <a href="#" className="font-medium text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
