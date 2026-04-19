import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  wikiSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Guide',
      items: ['guide/index'],
    },
    {
      type: 'doc',
      id: 'faq',
      label: 'FAQ',
    },
    {
      type: 'doc',
      id: 'legal',
      label: 'Legal Disclaimer',
    },
  ],
};

export default sidebars;
