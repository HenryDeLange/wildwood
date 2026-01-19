import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import i18n from './i18n/i18n';
import './main.css';
import './main.module.css';
import './main.scss';
import { PwaProvider } from './pwa/PwaProvider.tsx';
import { routeTree } from './routeTree.gen';

document.title = i18n.t('appTitle');

const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Register {
        router: typeof router
    }
};

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary fallback={
        <div style={{ textAlign: 'center', verticalAlign: 'center', width: '100%', height: '100%' }}>
            <h1>🔥💥🔥 😶‍🌫️ 🔥💥🔥</h1>
            <p>Unexpected Error!</p>
        </div>
    }>
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <PwaProvider>
                    <RouterProvider router={router} />
                </PwaProvider>
            </QueryClientProvider>
        </StrictMode>
    </ErrorBoundary>
);
