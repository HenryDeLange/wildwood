import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
    define: {
        VITE_APP_VERSION: JSON.stringify(version)
    },
    plugins: [
        tanstackRouter({ // Make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
            target: 'react',
            autoCodeSplitting: true
        }),
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']]
            }
        }),
        svgr(),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br'
        }),
        VitePWA({
            devOptions: {
                enabled: true
            },
            registerType: 'autoUpdate',
            strategies: 'generateSW',
            manifest: {
                name: 'WildWood',
                short_name: 'WildWood',
                description: 'WildWood online woodworking store.',
                theme_color: 'rgb(65, 112, 33)',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
                screenshots: [
                    {
                        src: 'pwa/screenshot-small.jpg',
                        sizes: '459x320',
                        type: 'image/png',
                        label: 'WildWood'
                    },
                    {
                        src: 'pwa/screenshot-large.jpg',
                        sizes: '1296x904',
                        type: 'image/png',
                        label: 'WildWood',
                        form_factor: 'wide'
                    }
                ],
                background_color: 'rgb(84, 122, 48)',
                display: 'standalone',
                launch_handler: {
                    client_mode: [
                        'focus-existing',
                        'auto'
                    ]
                }
            }
        })
    ]
});
