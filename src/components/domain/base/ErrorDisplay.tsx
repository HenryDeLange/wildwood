/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';
import { VBox } from '../../ui/layout';
import { Text } from '../../ui/mywild';

type Props = {
    error?: Error;
    errorLabel?: string;
    mode?: 'box' | 'line';
}

export function ErrorDisplay({ error, errorLabel, mode = 'line' }: Readonly<Props>) {
    const { t } = useTranslation();

    if (!error) {
        return null;
    }

    console.error('APP ERROR:', error);

    if (mode === 'line') {
        const errorReason = error.message;
        if (!errorLabel && !errorReason) {
            return (
                <Text variant='error'>
                    {t('errorUnknown')}
                </Text>
            );
        }
        return (
            <>
                {errorLabel &&
                    <Text variant='error'>
                        {errorLabel}
                    </Text>
                }
                {errorReason &&
                    <Text variant='error' size={errorLabel ? 'small' : 'standard'}>
                        {errorReason}
                    </Text>
                }
            </>
        );
    }

    return (
        <div
            style={{
                // backgroundColor: '#e6c1c1ff',
                border: '2px solid var(--color-error)',
                borderRadius: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.2rem',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}
        >
            <h3>💥🔥💥</h3>
            <VBox>
                <Text variant='error'>
                    {error.name}
                </Text>
                <Text variant='error' size='small'>
                    {error.message}
                </Text>
            </VBox>
        </div >
    );
}
