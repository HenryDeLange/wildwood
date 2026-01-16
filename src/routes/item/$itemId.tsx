import { createFileRoute } from '@tanstack/react-router';
import { ItemPage } from '../../components/domain/pages/item/ItemPage';

export const Route = createFileRoute('/item/$itemId')({
    component: RouteComponent
});

function RouteComponent() {
    const { itemId } = Route.useParams();
    return (
        <ItemPage itemId={Number(itemId)} />
    );
}
