# mejoraweb

Landing page for mejoraweb — auditoría técnica, rediseño y optimización web
para negocios locales en España.

Live: https://mejoraweb.app

## Stack

- React 18 + Vite 7
- Vanilla CSS (diseño minimalista escandinavo)
- Three.js — fluid simulation background (LiquidEther)
- Azure Static Web Apps — hosting y CI/CD
- GitHub Actions — deploy automático en push a main

## Structure

mejoraweb/
├── public/                  # Static assets (manifest, robots, sitemap)
├── src/
│   ├── components/
│   │   └── LiquidEther/     # WebGL fluid simulation background
│   │       ├── LiquidEther.jsx
│   │       └── LiquidEther.css
│   ├── css/
│   │   └── style.css        # Global styles
│   ├── App.jsx              # Main component — full site content
│   └── main.jsx             # Entry point
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # CI/CD pipeline
├── index.html               # Vite HTML shell + SEO meta tags
└── staticwebapp.config.json # Azure SWA routing, headers, cache rules


## Local Development
```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build
```bash
npm run build
```

Output goes to `dist/`. Azure handles this automatically on push.

## Deploy

Pushes to `main` trigger automatic deployment via GitHub Actions to Azure
Static Web Apps. No manual steps required.

## Authors

- Kevin Leon — Engineering & Design (https://www.linkedin.com/in/kevinleonj/)
- Andres Ramirez — Strategy, Technology & Business

Instituto de Empresa, Madrid.
