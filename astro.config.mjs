// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from "node:url"

// https://astro.build/config
export default defineConfig({
	site: 'https://cppreference-md.github.io',
	base: '/cppreference',
	integrations: [
		starlight({
			favicon: 'favicon.ico',
			title: 'cppreference.md',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/cppreference-md/cppreference' }],
			sidebar: [
				{
					label: 'C++',
					autogenerate: { directory: 'cpp' },
				}, {
					label: 'C',
					autogenerate: { directory: 'c' },
				},
			]
		}),
		mdx({

		})
	],
	markdown: {
		shikiConfig: {
			theme: 'github-light',
			wrap: true
		}
	}
});
