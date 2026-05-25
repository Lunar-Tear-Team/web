// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
	site: 'https://lunar-tear.com',
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	redirects: {
		'/guide/getting-started': '/guide/setup-quick/',
		'/devlog': '/changelog/',
	},
	integrations: [
		mermaid({ theme: 'dark', autoTheme: true }),
		starlight({
			title: 'Lunar Tear',
			description: 'NieR Re[in]carnation – Private Server',
			logo: {
				src: './src/assets/logo.webp',
				alt: 'Lunar Tear',
			},
			favicon: '/favicon.png',
			editLink: {
				baseUrl: 'https://github.com/Lunar-Tear-Team/web/edit/main/',
			},
			social: [
				{
					icon: 'discord',
					label: 'Discord',
					href: 'https://discord.gg/MZAf5aVkJG',
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/Walter-Sparrow/lunar-tear',
				},
				{
					icon: 'gitlab',
					label: 'GitLab',
					href: 'https://gitlab.com/walter-sparrow-group/lunar-tear',
				},
			],
			sidebar: [
				{
					label: 'Guide',
					items: [
						{ label: 'Introduction', slug: 'guide/intro' },
						{ label: 'Quick Setup', slug: 'guide/setup-quick' },
						{ label: 'Advanced Setup', slug: 'guide/setup-advanced' },
						{ label: 'FAQ', slug: 'guide/faq' },
						{ label: 'Legal', slug: 'guide/legal' },
					],
				},
				{
					label: 'Project',
					items: [
						{ label: 'Changelog', link: '/changelog/' },
						{ label: 'Releases', link: '/releases/' },
					],
				},
			],
		}),
	],
});
