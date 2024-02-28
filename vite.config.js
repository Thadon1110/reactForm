// vite.config.js
import react from '@vitejs/plugin-react';

export default {
	plugins: [react()],
	resolve: {
		alias: {
			react: 'react',
			'react-dom': 'react-dom',
			'react-hook-form': 'react-hook-form',
			'@hookform/resolvers/yup': '@hookform/resolvers/yup',
			yup: 'yup',
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001', // Zmodyfikuj na adres Twojego serwera Express
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
};
