// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from "node:url"
import remarkGfm from 'remark-gfm';
// @ts-ignore
import remarkAttr from 'remark-attr';
import remarkHeadlessTable from './remark-headless-tables.js';

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
			],
			customCss: [
				'./src/styles/custom.css',
			]
		}),
		mdx({
			remarkPlugins: [
				remarkGfm, remarkHeadlessTable
			]
		})
	],
	markdown: {
		shikiConfig: {
			theme: 'github-light',
			wrap: true
		}
	}
});
