import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppHeader } from '../components/domain/base/AppHeader';
import { ErrorDisplay } from '../components/domain/base/ErrorDisplay';
import i18n from '../i18n/i18n';
import styles from './__root.module.css';

export const Route = createRootRoute({
    component: () => (
        <div className={styles.RouteComponent}>
            <AppHeader />
            <Outlet />
            <TanStackRouterDevtools position='bottom-left' />
            <ReactQueryDevtools buttonPosition='bottom-right' />
        </div>
    ),
    notFoundComponent: () => (
        <ErrorDisplay error={new Error(i18n.t('errorPageNotFound'), { cause: 404 })} mode='box' />
    ),
    errorComponent: ({ error }) => (
        <ErrorDisplay error={error} mode='box' />
    )
});
