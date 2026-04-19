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
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Lunar Tear',
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
          href: 'https://discord.gg/G3anrfcV',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://github.com/Walter-Sparrow/lunar-tear',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://gitlab.com/walter-sparrow-group/lunar-tear',
          label: 'GitLab',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Lunar Tear',
        src: 'img/logo.png',
        href: '/',
      },
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Lunar Tear Team. Fan-made preservation project. Not affiliated with Square Enix or Applibot. No game files distributed. Non-commercial.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
