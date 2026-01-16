import { createFileRoute } from '@tanstack/react-router';
import { FaqPage } from '../components/domain/pages/FaqPage';

export const Route = createFileRoute('/faq')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <FaqPage />
    );
}
