# Chain Reaction

A streamlined word-linking puzzle game built as a Farcaster mini-app. Connect words using paint color names from major brands (Behr, Sherwin-Williams, Benjamin Moore).

## Features

- **Paint Color Word Bank**: Comprehensive collection of real paint color names
- **Chain Link Logic**: Validate compound word formations
- **Responsive Design**: Auto-scaling UI for all device sizes
- **Lazy Loading**: Optimized performance with code splitting
- **Farcaster Integration**: Proper mini-app structure with frame support
- **Enterprise Standards**: Clean architecture, type safety, performance optimized

## Tech Stack

- React 18 with TypeScript
- Vite for build optimization
- TailwindCSS for responsive styling
- Framer Motion for animations
- Express backend with PostgreSQL
- Drizzle ORM

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Game Rules

1. You're shown the first and last words in a chain
2. Fill in the missing words that form compound words
3. Each word connects to the next (e.g., Dog → House → Boat)
4. All words come from real paint color names

## Architecture

- `/client` - React frontend with lazy-loaded components
- `/server` - Express API with database integration
- `/shared` - Shared types, schemas, and word bank
- `farcaster.json` - Mini-app configuration

## Word Bank

Contains 200+ paint color names from:
- Behr (Polar Bear, Silver Lining, Ocean Breeze)
- Sherwin-Williams (Naval, Sea Salt, Agreeable Gray)
- Benjamin Moore (Hale Navy, Chantilly Lace, Revere Pewter)

## License

MIT
