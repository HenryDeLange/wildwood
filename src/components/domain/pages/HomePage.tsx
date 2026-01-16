import { PageContainer, VBox } from '../../ui/layout';
import { ItemsList } from '../components/ItemsList';

export function HomePage() {

    return (
        <PageContainer>
            <VBox fullWidth gap={0}>
                <ItemsList />
            </VBox>
        </PageContainer>
    );
}
