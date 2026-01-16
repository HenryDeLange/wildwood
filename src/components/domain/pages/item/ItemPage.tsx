import { CircleCheckBig } from 'lucide-react';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, HBox, PageContainer, VBox } from '../../../ui/layout';
import { Heading, LinkButton, RouterButton, Text } from '../../../ui/mywild';
import type { ItemProps } from '../../components/Item';
import { LoadingIndicator } from '../../components/LoadingIndicator';

type Props = {
    itemId: number;
}

export function ItemPage({ itemId }: Props) {
    const { t } = useTranslation();

    const [items, setItems] = useState<ItemProps[] | null>(null);

    useEffect(() => {
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6Tp66xYo2Zk0nCJeW9VNEs3q06p6driZO7k-e8sX0KzFYcrisNQ9JHqP-2pJDjj_LG21QhWbq-_iW/pub?gid=0&single=true&output=csv')
            .then(res => res.text())
            .then(content => {
                const parsed = Papa.parse(content, {
                    header: true, // Use first row as keys
                    skipEmptyLines: true // Ignore blank rows
                });
                const mapped: ItemProps[] = (parsed.data as any[]).map(row => ({
                    id: row['ID'],
                    item: row['Item'],
                    description: row['Description'],
                    price: parseFloat(row['Price'].replace(/[^\d.]/g, '')), // strip 'R'
                    seller: row['Seller'],
                    photo: row['Photo'] || null,
                    dateAdded: new Date(row['Date Added']),
                    dateSold: row['Date Sold'] ? new Date(row['Date Sold']) : null,
                    paymentLink: row['Payment Link']
                }));
                setItems(mapped);
            });
    }, []);

    const item: ItemProps | null = items?.find(fetchedItem => Number(fetchedItem.id) === itemId) ?? null;

    return (
        <PageContainer>
            <VBox fullWidth>
                <Box margin='1rem'>
                    {!items
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