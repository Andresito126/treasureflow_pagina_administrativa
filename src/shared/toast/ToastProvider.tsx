import type { ReactNode } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/utils/cn';
import { Icon } from '@/shared/ui/Icon';
import { ToastContext } from './ToastContext';
import type { ToastApi, ToastOptions, ToastTone } from './ToastContext';

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

const TONE_META: Record<ToastTone, { icon: string; accent: string }> = {
  success: { icon: 'check_circle', accent: 'text-primary' },
  error: { icon: 'error', accent: 'text-danger' },
  warning: { icon: 'warning', accent: 'text-warning' },
  info: { icon: 'info', accent: 'text-info' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = ++idRef.current;
      const tone = options?.tone ?? 'success';
      setToasts((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), options?.duration ?? 3500);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (m) => show(m, { tone: 'success' }),
      error: (m) => show(m, { tone: 'error' }),
      warning: (m) => show(m, { tone: 'warning' }),
      info: (m) => show(m, { tone: 'info' }),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-2">
          {toasts.map((t) => {
            const meta = TONE_META[t.tone];
            return (
              <div
                key={t.id}
                className={cn(
                  'pointer-events-auto flex items-center gap-3 rounded-xl border border-stroke bg-card px-4 py-3 shadow-card',
                  'animate-[toastIn_.18s_ease-out]',
                )}
                role="status"
              >
                <Icon name={meta.icon} size={22} className={meta.accent} />
                <p className="flex-1 text-sm font-medium text-content">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-muted transition-colors hover:text-content"
                  aria-label="Cerrar notificación"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body,
      )}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}`}</style>
    </ToastContext.Provider>
  );
}
