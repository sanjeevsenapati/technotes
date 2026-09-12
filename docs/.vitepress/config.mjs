import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/technotes/',
  title: "TechNotes",
  description: "Practical Engineering Documentation",
  cleanUrls: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'On This Page'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Linux', link: '/linux/fundamentals' },
      { text: 'Shell', link: '/shell/bash-basics' },
      { text: 'Containers', link: '/containers/1-fundamentals' },
      { text: 'Kubernetes', link: '/kubernetes/1-architecture' }
    ],
    sidebar: [
      {
        text: 'LINUX',
        collapsed: false,
        items: [
          { text: 'Linux Fundamentals', link: '/linux/fundamentals' },
          { text: 'Files & Directories', link: '/linux/files-and-directories' },
          { text: 'Troubleshooting', link: '/linux/troubleshooting' }
        ]
      },
      {
        text: 'SHELL',
        collapsed: false,
        items: [
          { text: 'Bash Basics', link: '/shell/bash-basics' },
          { text: 'Variables', link: '/shell/variables' },
          { text: 'Shell Scripting', link: '/shell/shell-scripting' }
        ]
      },
      {
        text: 'CONTAINERS',
        collapsed: false,
        items: [
          { text: '1. Fundamentals', link: '/containers/1-fundamentals' },
          { text: '2. Docker', link: '/containers/2-docker' },
          { text: '3. Podman', link: '/containers/3-podman' }
        ]
      },
      {
        text: 'KUBERNETES',
        collapsed: false,
        items: [
          { text: '1. Architecture', link: '/kubernetes/1-architecture' },
          { text: '2. Pods', link: '/kubernetes/2-pods' },
          { text: '3. ReplicaSets', link: '/kubernetes/3-replicasets' },
          { text: '4. Deployments', link: '/kubernetes/4-deployments' },
          { text: '5. Services', link: '/kubernetes/5-services' },
          { text: '6. ConfigMaps & Secrets', link: '/kubernetes/6-configmaps-and-secrets' },
          { text: '7. Volumes & Storage', link: '/kubernetes/7-volumes-and-storage' },
          { text: '8. Ingress', link: '/kubernetes/8-ingress' },
          { text: '9. RBAC', link: '/kubernetes/9-rbac' },
          { text: '10. Advanced Scheduling', link: '/kubernetes/10-advanced-scheduling' },
          { text: '11. StatefulSets', link: '/kubernetes/11-statefulsets' },
          { text: '12. DaemonSets', link: '/kubernetes/12-daemonsets' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sanjeevsenapati/lishes' }
    ],
    footer: {
      message: 'Practical Engineering Documentation',
      copyright: 'Copyright © Sanjeev Senapati'
    }
  }
});
