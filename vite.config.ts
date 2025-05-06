import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    // should be GitHub repo name, for Pages
    base: '/mushroom-game/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './public/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@controllers': path.resolve(__dirname, './src/controllers'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@scenes': path.resolve(__dirname, './src/scenes'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
});
