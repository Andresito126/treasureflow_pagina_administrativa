import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { DiProvider } from '@/core/di/DiProvider';
import { ToastProvider } from '@/shared/toast/ToastProvider';
import { AuthProvider } from '@/features/auth/presentation/AuthProvider';
import { AppRoutes } from '@/app/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <DiProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </DiProvider>
    </ThemeProvider>
  );
}
