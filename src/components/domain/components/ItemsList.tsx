import { useQuery } from '@tanstack/react-query';
import { KEY_GOOGLE_SHEET, fetchItems } from '../../../data/queries';
import { VBox } from '../../ui/layout';
import { Item } from './Item';
import { LoadingIndicator } from './LoadingIndicator';

// TODO: Virtualize the list of items (tanstack lib?)

export function ItemsList() {
    const {
        data: items,
        isLoading
    } = useQuery({ queryKey: [KEY_GOOGLE_SHEET], queryFn: fetchItems });

    return (
        <div style={{ padding: '1rem' }}>
            {isLoading
                ? // loading
                <LoadingIndicator />
                : // loaded
                <VBox>
                    {items?.map((item) => <Item key={item.id} {...item} />)}
                </VBox>
            }
        </div>
    );
}
