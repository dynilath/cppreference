// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			favicon: 'favicon.ico',
			title: 'cppreference.md',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cppreference-md/cppreference' }],
			sidebar: [
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
