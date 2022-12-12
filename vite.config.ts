/* eslint-disable no-useless-escape */

import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			lib: path.resolve(__dirname, "src/lib"),
			js: path.resolve(__dirname, "src/js"),
			routes: path.resolve(__dirname, "src/routes"),
		},
	},
	server: {
		headers: {
			"Content-Security-Policy": encodeURIComponent(`
                connect-src https://hcaptcha.com, https://\*.hcaptcha.com ${process.env.VITE_API_URL};
                frame-src: https://hcaptcha.com, https://\*.hcaptcha.com;
                style-src: https://hcaptcha.com, https://\*.hcaptcha.com;
                script-src: https://hcaptcha.com, https://\*.hcaptcha.com;
                default-src 'self';
                frame-ancestors 'self';
                form-action 'self';
            `),
		},
	},
};

export default config;
