import { useQuery } from '@tanstack/react-query';
import { CircleCheckBig } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchItems, KEY_GOOGLE_SHEET } from '../../../../data/queries';
import { Box, HBox, PageContainer, VBox } from '../../../ui/layout';
import { Heading, LinkButton, RouterButton, Text } from '../../../ui/mywild';
import type { ItemProps } from '../../components/Item';
import { LoadingIndicator } from '../../components/LoadingIndicator';

type Props = {
    itemId: number;
}

export function ItemPage({ itemId }: Props) {
    const { t } = useTranslation();

    const {
        data: items,
        isLoading
    } = useQuery({ queryKey: [KEY_GOOGLE_SHEET], queryFn: fetchItems });

    const item: ItemProps | null = items?.find(fetchedItem => Number(fetchedItem.id) === itemId) ?? null;

    return (
        <PageContainer>
            <VBox fullWidth>
                <Box margin='1rem'>
                    {isLoading
                        ? // loading
                        <LoadingIndicator />
                        : // loaded
                        <>
                            {!item
                                ?
                                <VBox>
                                    <Heading>
                                        This item does not exist
                                    </Heading>
                                    <RouterButton to='/'>
                                        'View all items'
                                    </RouterButton>
                                </VBox>
                                :
                                <VBox fullWidth>
                                    <HBox>
                                        <Heading>
                                            {item.item}
                                        </Heading>
                                        <Box marginLeft='auto'>
                                            <Text variant='subdued' size='small'>
                                                {t('itemId', { id: item.id })}
                                            </Text>
                                        </Box>
                                    </HBox>
                                    {item.photo &&
                                        <img src={item.photo} />
                                    }
                                    <Text>
                                        {item.description}
                                    </Text>
                                    <Text>
                                        {t('currency', { price: item.price })}
                                    </Text>
                                    <Text variant='subdued' size='tiny'>
                                        {item.dateAdded.toLocaleDateString()}
                                    </Text>
                                    <Text variant='subdued' size='tiny'>
                                        {item.seller}
                                    </Text>
                                    {item.dateSold
                                        ? // sold
                                        <Text variant='subdued'>
                                            {t('sold')}
                                        </Text>
                                        : // buy
                                        <LinkButton onClick={() => alert(`TODO: Pay via link: ${item.paymentLink}`)}>
                                            <HBox gap='0.25rem'>
                                                <CircleCheckBig size='1rem' color='var(--color-primary)' />
                                                <Text variant='priority'>
                                                    {t('payOnline')}
                                                </Text>
                                            </HBox>
                                        </LinkButton>
                                    }
                                </VBox>
                            }
                        </>
                    }
                </Box>
            </VBox>
        </PageContainer>
    );
}