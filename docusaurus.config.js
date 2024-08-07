// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {
  themes as prismThemes
} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Avila Docs - Departamento Mobile',
  tagline: 'Documentación de la comunidad de Avila Tek',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://aviladocs.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Avila-Tek', // Usually your GitHub org/user name.
  projectName: 'avilatek-mobile-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Avila Docs',
        logo: {
          alt: 'Avila Tek Logo',
          src: 'img/logo.svg',
        },
        items: [{
          // type: 'docSidebar',
          // sidebarId: 'tutorialSidebar',
          to: '/code-rules',
          position: 'left',
          label: 'Reglamento de Estilo de Código',
        }
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
        ],
      },
      footer: {
        style: 'dark',
        links: [{
          title: 'Docs',
          items: [
            {
              label: 'Reglamento de Estilo de Código',
              to: '/code-rules',
            },
            {
              label: 'Guía de contribución al Reglamento',
              to: '/code-rules/contribute',
            },
          ],
        },
        {
          title: 'Community',
          items: [{
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/company/avilatek',
          },
          {
            label: 'Instagram',
            href: 'https://www.instagram.com/avilatek/',
          },
          {
            label: 'TikTok',
            href: 'https://www.tiktok.com/@avilatek',
          },
          ],
        },
        {
          title: 'More',
          items: [{
            label: 'Website',
            to: 'https://avilatek.com',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/Avila-Tek/avilatek-mobile-docs',
          },
          ],
        },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Avila Tek. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['dart'],
      },
    }),
};

export default config;