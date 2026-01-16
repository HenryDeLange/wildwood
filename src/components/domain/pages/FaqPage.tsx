import { useTranslation } from 'react-i18next';
import { Box, PageContainer, VBox } from '../../ui/layout';
import { Text } from '../../ui/mywild';

export function FaqPage() {
    const { t } = useTranslation();

    return (
        <PageContainer>
            <VBox fullWidth>
                <Box margin='1rem'>
                    <Text variant='warning'>
                        TODO: FAQ like: shipping, queries, etc.
                    </Text>
                </Box>
            </VBox>
        </PageContainer >
    );
}
