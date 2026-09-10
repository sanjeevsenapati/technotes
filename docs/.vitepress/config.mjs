import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Lishes",
  description: "Linux Shell Scripts Documentation",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/guide/monitoring' }
    ],

    sidebar: [
      {
        text: 'Script Categories',
        items: [
          { text: 'Monitoring', link: '/guide/monitoring' },
          { text: 'Automation', link: '/guide/automation' },
          { text: 'Backups', link: '/guide/backups' },
          { text: 'Networks', link: '/guide/networks' },
          { text: 'Utilities', link: '/guide/utilities' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sanjeevsenapati/lishes' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Sanjeev Senapati'
    }
  }
})
