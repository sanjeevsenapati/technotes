# TechNotes

Welcome to **TechNotes** (formerly Lishes), a comprehensive collection of technical documentation, simple and complex shell scripts, and engineering knowledge designed to streamline system administration tasks and make life easier for Linux administrators and DevOps engineers.

This documentation site is built using [VitePress](https://vitepress.dev/), a fast and minimalist static site generator.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:sanjeevsenapati/technotes.git
   cd lishes
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage & Local Development

To start the local development server with hot-module replacement (HMR):

```bash
npm run docs:dev
```
The site will be available at `http://localhost:5173/technotes/`.

### Building for Production

To build the static site for production deployment:

```bash
npm run docs:build
```
The generated static files will be located in the `docs/.vitepress/dist` directory.

### Previewing the Production Build

To preview the generated production build locally:

```bash
npm run docs:preview
```

## How to Add Content

### 1. Adding a New Page

All documentation pages are written in standard Markdown (`.md`) files and are stored in the `docs/` directory.

To create a new page, simply add a new Markdown file in the appropriate category folder (e.g., `docs/kubernetes/my-new-page.md`). 

You can use Markdown frontmatter at the top of the file to define the title and other metadata:

```markdown
---
title: My New Page
description: A description of what this page covers.
---

# My New Page

Your content goes here...
```

### 2. Adding a Category or Updating the Sidebar

The sidebar navigation is configured in the VitePress configuration file. 
If you add a new page or want to create a new category, update `docs/.vitepress/config.mjs`:

1. Open `docs/.vitepress/config.mjs`.
2. Locate the `sidebar` array inside `themeConfig`.
3. Add your new page link to the relevant category's `items` array:
   ```javascript
   {
     text: 'KUBERNETES',
     collapsed: false,
     items: [
       // ... existing items
       { text: 'My New Page', link: '/kubernetes/my-new-page' }
     ]
   }
   ```

## Deployment

This site is configured to be deployed to GitHub Pages on the `website` branch.
When you run `npm run docs:build`, VitePress will generate the static files with the base URL configured for the `technotes` repository.

*Note: The original project specification and design philosophy can be found in [PROJECT_SPEC.md](./PROJECT_SPEC.md).*
