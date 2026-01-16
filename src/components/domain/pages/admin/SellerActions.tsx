import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../ui/layout';

export function SellerActions() {
    const { t } = useTranslation();

    return (
        <PageContainer>
            - check that seller is a seller by checking if he has write access to the spreadsheet
            - ui or link to form where seller items can be maintained (crud of own items)
        </PageContainer>
    );
}