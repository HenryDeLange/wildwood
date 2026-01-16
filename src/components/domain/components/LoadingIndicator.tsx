import { VBox } from '../../ui/layout';
import { Spinner } from '../../ui/mywild';

export function LoadingIndicator() {
    return (
        <VBox fullWidth margin='auto'>
            <div style={{ alignSelf: 'center' }}>
                <Spinner />
            </div>
        </VBox>
    );
}
