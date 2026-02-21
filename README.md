# riveer.cz

Personal portfolio site built with Next.js 16, featuring i18n support, smooth animations, and a cyberpunk-inspired design.

## Tech Stack

- **Framework:** Next.js 16 (Static Export)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **i18n:** Custom implementation (EN/CS)

## Features

- Responsive design with mobile-first approach
- Dark theme with cyan/purple accents
- Animated tech orbit showcase
- Project cards with screenshots
- SEO optimized with structured data
- Static export for nginx deployment

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run deploy
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static export to `out/` |
| `npm run og:image` | Generate Open Graph image |
| `npm run deploy` | Generate OG image + build |

## Project Structure

```
src/
├── app/           # Next.js app router
│   └── [locale]/  # i18n routes
├── components/    # React components
├── data/          # Static data (projects, experience)
└── i18n/          # Translations and config
```

## Deployment

Build and serve the `out/` directory with nginx:

```bash
npm run deploy
```

## License

MIT
