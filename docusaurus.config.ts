import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Lunar Tear',
  tagline: 'NieR Re[in]carnation - Private Server',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://lunar-tear.com',
  baseUrl: '/',

  organizationName: 'Walter-Sparrow',
  projectName: 'web',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Lunar-Tear-Team/web/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Lunar Tear Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki',
        },
        {
          href: 'https://github.com/Walter-Sparrow/lunar-tear',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Wiki',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Getting Started', to: '/docs/getting-started'},
{label: 'FAQ', to: '/docs/faq'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Discord', href: 'https://discord.gg/G3anrfcV'},
            {label: 'GitHub', href: 'https://github.com/Walter-Sparrow/lunar-tear'},
            {label: 'GitLab', href: 'https://gitlab.com/walter-sparrow-group/lunar-tear'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Legal Disclaimer', to: '/legal'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lunar Tear Team. Fan-made preservation project. Not affiliated with Square Enix or Applibot. No game files distributed. Non-commercial.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
