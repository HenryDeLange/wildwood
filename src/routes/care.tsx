import { createFileRoute } from '@tanstack/react-router';
import { CarePage } from '../components/domain/pages/CarePage';

export const Route = createFileRoute('/care')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <CarePage />
    );
}
