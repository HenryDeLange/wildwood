import { CircleCheckBig, MailIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Box, HBox, VBox } from '../../ui/layout';
import { Card, Heading, LinkButton, RouterLink, Text } from '../../ui/mywild';

export type ItemProps = {
    id: number,
    item: string;
    description: string;
    price: number;
    seller: string;
    photo: string | null;
    dateAdded: Date;
    dateSold: Date | null;
    paymentLink: string | null;
}

export function Item({ id, item, description, price, seller, photo, dateAdded, dateSold, paymentLink }: ItemProps) {
    const { t } = useTranslation();
    return (
        <Card
            title={
                <RouterLink to='/item/$itemId' params={{ itemId: id.toString() }}>
                    <Heading>
                        {item}
                    </Heading>
                </RouterLink>
            }
            description={photo && <img src={photo} />}
            right={
                <Text
                    variant={dateSold ? 'subdued' : 'bold'}
                    size={dateSold ? 'standard' : 'priority'}
                >
                    {t('currency', { price })}
                </Text>
            }
        >
            <VBox>
                <Text>
                    {description}
                </Text>
                <HBox>
                    <Text variant='subdued' size='tiny'>
                        {t('itemId', { id })}
                    </Text>
                    <Text variant='subdued' size='tiny'>
                        |
                    </Text>
                    <Text variant='subdued' size='tiny'>
                        {dateAdded.toLocaleDateString()}
                    </Text>
                    <Text variant='subdued' size='tiny'>
                        |
                    </Text>
                    <Text variant='subdued' size='tiny'>
                        {seller}
                    </Text>
                </HBox>
                <HBox>
                    <LinkButton onClick={() => window.location.href = `mailto:${seller}?subject=${encodeURIComponent(`${id} - ${item} - $${price}`)}`}>
                        <HBox gap='0.25rem'>
                            <MailIcon size='1rem' />
                            <Text size='small'>
                                {t('emailSeller')}
                            </Text>
                        </HBox>
                    </LinkButton>
                    <Box marginLeft='auto'>
                        {dateSold
                            ? // sold
                            <Text variant='subdued'>
                                {t('sold')}
                            </Text>
                            : // buy
                            <LinkButton onClick={() => alert(`TODO: Pay via link: ${paymentLink}`)}>
                                <HBox gap='0.25rem'>
                                    <CircleCheckBig size='1rem' color='var(--color-primary)' />
                                    <Text variant='priority'>
                                        {t('payOnline')}
                                    </Text>
                                </HBox>
                            </LinkButton>
                        }
                    </Box>
                </HBox>
            </VBox>
        </Card >
    );
}
