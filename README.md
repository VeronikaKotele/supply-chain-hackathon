# Dashboard Project

An intuitive and visually appealing dashboard with interactive 3D Earth visualization built with React, TypeScript, Tailwind CSS, and Babylon.js.

## Features

- **Sticky Navigation Bar** - Logo, navigation links, search field, new project button, and user avatar dropdown
- **Overview Dashboard** - Achievement stats, data visualizations, summary cards, and project table
- **Interactive 3D Earth Map** - Built with Babylon.js with rotation, zoom, and atmospheric effects

## Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager

## Local Setup Instructions

### 1. Initialize the Project

If starting from scratch, create a new Vite + React + TypeScript project:

```bash
npm create vite@latest dashboard-project -- --template react-ts
cd dashboard-project
```

### 2. Install Dependencies

Install all required packages:

```bash
# Core dependencies
npm install react react-dom

# UI and styling
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge
npm install class-variance-authority

# Icons
npm install lucide-react

# Charts
npm install recharts

# 3D rendering
npm install @babylonjs/core @babylonjs/loaders

# Radix UI components (for shadcn/ui)
npm install @radix-ui/react-avatar
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-progress
npm install @radix-ui/react-tabs
npm install @radix-ui/react-slot
npm install @radix-ui/react-label

# Development dependencies
npm install -D @types/react @types/react-dom
npm install -D typescript
npm install -D vite
```

### 3. Configure Tailwind CSS

Initialize Tailwind CSS:

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Project Structure

Organize your files like this:

```
project-root/
├── index.html
├── App.tsx
├── main.tsx (entry point)
├── styles/
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── HeroPanel.tsx
│   ├── SummaryCards.tsx
│   ├── EntriesTable.tsx
│   ├── EarthMap.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── dropdown-menu.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── progress.tsx
│       └── ... (other shadcn components)
```

### 5. Create Entry Point Files

Create `main.tsx` in the root:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Create `index.html` in the root:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```

### 6. Set Up Tailwind CSS

Make sure your `styles/globals.css` includes:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 7. Configure TypeScript

Create or update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 8. Configure Vite

Create or update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### 9. Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 10. Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is taken).

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Troubleshooting

### Common Issues

**Issue: "Module not found" errors**
- Make sure all dependencies are installed: `npm install`
- Check that import paths are correct (relative paths like `./components/...`)

**Issue: Tailwind styles not working**
- Ensure `globals.css` is imported in `main.tsx`
- Check that `tailwind.config.js` includes all relevant file paths

**Issue: Babylon.js canvas not rendering**
- Make sure `@babylonjs/core` and `@babylonjs/loaders` are installed
- Check browser console for WebGL errors
- Ensure your browser supports WebGL 2.0

**Issue: TypeScript errors**
- Run `npm install -D @types/react @types/react-dom`
- Make sure `tsconfig.json` is properly configured

## Dependencies Explained

- **lucide-react** - Icon library (provides Search, Plus, ChevronDown, etc.)
- **recharts** - Chart library for data visualizations
- **@babylonjs/core** - 3D rendering engine for the Earth map
- **@radix-ui/** - Headless UI components used by shadcn/ui
- **tailwindcss** - Utility-first CSS framework
- **vite** - Build tool and dev server

## Notes

- This project was originally built in Figma Make, which handles dependencies automatically
- When running locally, you need to manually install all dependencies
- The shadcn/ui components in `/components/ui/` are pre-built and ready to use
- All external images use Unsplash URLs and require internet connection

## License

MIT
