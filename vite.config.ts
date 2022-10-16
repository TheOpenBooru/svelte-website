import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import * as path from 'path';

const config: UserConfig = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            "lib": path.resolve(__dirname, 'src/lib'),
            "js": path.resolve(__dirname, 'src/js'),
            "routes": path.resolve(__dirname, 'src/routes'),
        }
    }
};

export default config;
