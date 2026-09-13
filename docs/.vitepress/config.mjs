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
      { text: '🏠 Home', link: '/' },
      {
        text: 'Documentation ▾',
        items: [
          { text: 'Linux', link: '/linux/fundamentals' },
          { text: 'Shell', link: '/shell/bash-basics' },
          { text: 'Git', link: '/git/1-fundamentals' },
          { text: 'Containers', link: '/containers/1-fundamentals' },
          { text: 'Kubernetes', link: '/kubernetes/1-architecture' },
          { text: 'OpenShift', link: '/openshift/1-architecture-and-differences' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'LINUX',
        collapsed: false,
        items: [
          { text: '1. Fundamentals', link: '/linux/fundamentals' },
          { text: '2. Files & Directories', link: '/linux/files-and-directories' },
          { text: '3. Storage & LVM', link: '/linux/storage-and-lvm' },
          { text: '4. User Management', link: '/linux/user-management' },
          { text: '5. Package Management', link: '/linux/package-management' },
          { text: '6. Processes & Services', link: '/linux/processes-and-services' },
          { text: '7. Networking', link: '/linux/networking' },
          { text: '8. Troubleshooting', link: '/linux/troubleshooting' }
        ]
      },
      {
        text: 'SHELL',
        collapsed: false,
        items: [
          { text: '1. Bash Basics', link: '/shell/bash-basics' },
          { text: '2. Variables', link: '/shell/variables' },
          { text: '3. Control Flow', link: '/shell/control-flow' },
          { text: '4. Stream Utilities', link: '/shell/stream-utilities' },
          { text: '5. Grep & Regex', link: '/shell/grep-and-regex' },
          { text: '6. Sed', link: '/shell/sed' },
          { text: '7. Awk', link: '/shell/awk' },
          { text: '8. Shell Scripting', link: '/shell/shell-scripting' }
        ]
      },
      {
        text: 'GIT',
        collapsed: false,
        items: [
          { text: '1. Fundamentals', link: '/git/1-fundamentals' },
          { text: '2. Branching & Merging', link: '/git/2-branching-and-merging' },
          { text: '3. Remotes & Collaboration', link: '/git/3-remotes-and-collaboration' },
          { text: '4. Advanced Workflows', link: '/git/4-advanced-workflows' }
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
      },
      {
        text: 'OPENSHIFT',
        collapsed: false,
        items: [
          { text: '1. Architecture & Core Differences', link: '/openshift/1-architecture-and-differences' },
          { text: '2. Projects & Users', link: '/openshift/2-projects-and-users' },
          { text: '3. Security Context Constraints', link: '/openshift/3-security-context-constraints' },
          { text: '4. Routes & Networking', link: '/openshift/4-routes-and-networking' },
          { text: '5. Builds & Deployments', link: '/openshift/5-builds-and-deployments' }
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
