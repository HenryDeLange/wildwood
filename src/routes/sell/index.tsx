import { createFileRoute } from '@tanstack/react-router';
import { SellerActions } from '../../components/domain/pages/admin/SellerActions';

export const Route = createFileRoute('/sell/')({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <SellerActions />
    );
}
