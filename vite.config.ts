import path from 'path';

import istanbul from "vite-plugin-istanbul";
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		istanbul({
			cypress: true,
			requireEnv: false,
		})
	],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src/'),
			}
		],
	},
	server: {
		host: true,
		port: 3000,
	},
});

