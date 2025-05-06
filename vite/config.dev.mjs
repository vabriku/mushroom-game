import { defineConfig } from 'vite';
import commonConfig from '../vite.config';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser'],
                },
            },
        },
    },
    server: {
        port: 8080,
    },
    resolve: {
        alias: commonConfig.resolve.alias,
    },
});
