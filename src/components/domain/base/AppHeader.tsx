import type { LinkProps } from '@tanstack/react-router';
import { ArrowBigDownDash } from 'lucide-react';
import { use, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PwaContext } from '../../../pwa/pwaContext';
import { Box, HBox, HideOnMobile, ShowOnMobile, VBox } from '../../ui/layout';
import { Button, Heading, RouterLink, Text } from '../../ui/mywild';
import { Drawer } from '../../ui/mywild/Drawer';

export function AppHeader() {
    const { t } = useTranslation();

    const { isPwa, showPwaInstallButton, handleInstallClick } = use(PwaContext);

    const menus = useMemo(() => [
        {
            title: t('faqButton'),
            href: '/faq' as LinkProps['to']
        },{
            title: t('careButton'),
            href: '/care' as LinkProps['to']
        },
        {
            title: t('aboutButton'),
            href: '/about' as LinkProps['to']
        }
    ], [t]);

    const logo = <img src='/pwa-64x64.png' width={32} height={32} style={{ borderRadius: '35%' }} />;
    const smallLogo = <img src='/pwa-64x64.png' width={16} height={16} style={{ borderRadius: '25%' }} />;

    return (
        <VBox marginTop='0.25rem'>
            <HBox marginLeft='0.5rem' marginRight='0.5rem'>
                <HBox gap='0.25rem'>
                    <ShowOnMobile>
                        <HBox marginRight='0.5rem'>
                            <Drawer
                                heading={
                                    <HBox gap='0.25rem'>
                                        {logo}
                                        <Heading>
                                            {t('appTitle')}
                                        </Heading>
                                    </HBox>
                                }
                                menus={[
                                    ...menus
                                ]}
                            />
                        </HBox>
                    </ShowOnMobile>
                    <HideOnMobile useHardCutoff>
                        <RouterLink to='/'>
                            {logo}
                        </RouterLink>
                    </HideOnMobile>
                    <ShowOnMobile useHardCutoff>
                        <RouterLink to='/'>
                            {smallLogo}
                        </RouterLink>
                    </ShowOnMobile>
                    <HideOnMobile>
                        <HBox gap='0.25rem'>
                            <RouterLink to='/'>
                                <Heading variant='priority' size='sub-title'>
                                    {t('appTitle')}
                                </Heading>
                            </RouterLink>
                        </HBox>
                    </HideOnMobile>
                    <ShowOnMobile>
                        <RouterLink to='/'>
                            <Text size='large'>
                                {t('appTitle')}
                            </Text>
                        </RouterLink>
                    </ShowOnMobile>
                </HBox>
                {!isPwa && showPwaInstallButton &&
                    <>
                        <HideOnMobile>
                            <Button
                                size='small'
                                onClick={handleInstallClick}
                                icon={<ArrowBigDownDash size='1.1rem' />}
                            >
                                {t('pwaInstall')}
                            </Button>
                        </HideOnMobile>
                        <ShowOnMobile>
                            <Button
                                size='small'
                                onClick={handleInstallClick}
                                icon={<ArrowBigDownDash size='1.0rem' />}
                            />
                        </ShowOnMobile>
                    </>
                }
                <HBox marginLeft='auto' marginRight='auto' gap='2rem'>
                    {menus.map(menuItem => (
                        <HideOnMobile key={menuItem.title}>
                            <RouterLink to={menuItem.href}>
                                {menuItem.title}
                            </RouterLink>
                        </HideOnMobile>
                    ))}
                </HBox>
                <Box marginLeft='auto'>
                    <RouterLink to='/sell'>
                        {t('sellButton')}
                    </RouterLink>
                </Box>
            </HBox>
        </VBox>
    );
}
