# Chain Reaction

A word-linking puzzle game built as a Farcaster mini-app. Connect words using real paint color names from major brands to form compound words.

## 🎮 Game Overview

Chain Reaction challenges players to find missing words that connect a chain through compound word formations. Each word in the chain combines with the next to form a valid compound word (e.g., Dog + House = Doghouse, House + Boat = Houseboat).

## ✨ Features

### Core Gameplay
- **600+ Paint Color Word Bank**: Unique, sentence-producing names from Behr, Sherwin-Williams, Benjamin Moore
- **Smart Chain Logic**: 300+ validated compound word combinations
- **Three Difficulty Levels**: Easy (5 words), Medium (6 words), Hard (7+ words)
- **Hint System**: Contextual hints with scoring penalties
- **Real-time Validation**: Instant feedback on guesses

### Social Features
- **Leaderboard**: Score-based rankings per puzzle (time + hints)
- **Share Results**: Native share API integration with custom messages
- **Create Puzzles**: Build and validate your own word chains
- **Puzzle Validation**: Real-time compound word verification

### Technical Excellence
- **Lazy Loading**: Code-split components for optimal performance
- **Responsive Design**: Auto-scaling UI for mobile, tablet, desktop
- **Farcaster Integration**: Proper mini-app structure with frame support
- **Error Handling**: Comprehensive error boundaries and user feedback
- **TypeScript**: Full type safety across client and server
- **Database**: PostgreSQL with Drizzle ORM

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL (optional for development)

# 3. Setup database (if using database)
npm run db:push

# 4. Development
npm run dev

# 5. Production build
npm run build
npm start
```

> **Note**: For detailed setup instructions, database options, and troubleshooting, see [`.env.example`](.env.example) file which contains a complete walkthrough.

## 📁 Project Structure

```
chain-reaction/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Route pages
│   │   └── lib/           # Utilities
│   └── index.html         # Entry point with Farcaster meta tags
├── server/                # Express backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Database layer
│   └── index.ts           # Server entry
├── shared/                # Shared code
│   ├── wordbank.ts        # 600+ paint color names
│   ├── chainLogic.ts      # Compound word validation
│   ├── schema.ts          # Database schemas
│   └── routes.ts          # API contracts
└── farcaster.json         # Mini-app configuration
```

## 🎯 Game Rules

1. **Objective**: Fill in missing words between the start and end words
2. **Constraint**: Each word must form a compound word with the next
3. **Scoring**: 
   - Base: 10,000 points
   - Time penalty: -10 points per second
   - Hint penalty: -500 points per hint
4. **Word Bank**: All words are real paint color names

## 🔧 API Endpoints

### Puzzles
- `GET /api/puzzles` - List all puzzles
- `POST /api/puzzles` - Create new puzzle
- `POST /api/puzzles/validate` - Validate word chain

### Leaderboard
- `GET /api/leaderboard/:puzzleId` - Get puzzle leaderboard
- `POST /api/leaderboard` - Submit score

### Sharing
- `POST /api/share` - Generate share link and text

## 🎨 Paint Color Examples

The word bank includes creative names like:
- Storm Lightning
- Heart To Heart
- Sweet Juliet
- Evening Slipper
- Morning Glory
- Secret Garden
- Golden Gate
- Ocean Breeze

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for build optimization
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **Wouter** for routing

### Backend
- **Express** server
- **PostgreSQL** database
- **Drizzle ORM** for type-safe queries
- **Zod** for validation

### Deployment
- Optimized for Farcaster frames
- Mobile-first responsive design
- Safe area insets for notched devices
- Code splitting for fast loads

## 🧪 Development

```bash
# Type checking
npm run check

# Database migrations
npm run db:push

# Build for production
npm run build
```

## 📊 Scoring System

```
Score = 10,000 - (completionTime * 10) - (hintsUsed * 500)
```

- Faster completion = Higher score
- Fewer hints = Higher score
- Minimum score: 0

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all types pass: `npm run check`
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Farcaster Documentation](https://docs.farcaster.xyz/)
- [Paint Color References](https://www.behr.com/consumer/colors)

## 🐛 Known Issues

None currently. Report issues via GitHub.

## 🎯 Roadmap

- [ ] Daily challenges
- [ ] Multiplayer mode
- [ ] Achievement system
- [ ] Custom themes
- [ ] Sound effects

---

Built with ❤️ for the Farcaster community
