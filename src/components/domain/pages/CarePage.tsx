import { useTranslation } from 'react-i18next';
import { Box, PageContainer, VBox } from '../../ui/layout';
import { Text } from '../../ui/mywild';

export function CarePage() {
    const { t } = useTranslation();

    return (
        <PageContainer>
            <VBox fullWidth>
                <Box margin='1rem'>
                    <Text variant='warning'>
                        TODO: Tips on caring for the wood products
                    </Text>
                </Box>
            </VBox>
        </PageContainer >
    );
}
