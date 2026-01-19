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
├── app/                   # React frontend (Farcaster mini-app)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Route pages
│   │   └── lib/           # Utilities
│   └── index.html         # Entry point with Farcaster meta tags
├── api/                   # API routes (Farcaster mini-app structure)
│   ├── puzzles.ts         # Puzzle endpoints
│   ├── leaderboard.ts     # Leaderboard endpoints
│   ├── share.ts           # Share endpoints
│   └── index.ts           # Route registration
├── server/                # Express server setup
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Database layer
│   ├── static.ts          # Static file serving
│   ├── vite.ts            # Vite dev server setup
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

## 🧪 Testing

Chain Reaction includes a comprehensive enterprise-grade test suite with high coverage across all layers of the application.

### Test Structure

The test suite is organized by application layer:

```
test/
├── frontend/              # Frontend tests
│   ├── components/        # React component tests
│   ├── hooks/            # Custom hook tests
│   ├── pages/            # Page component tests
│   └── lib/              # Utility function tests
├── backend/              # Backend tests
│   ├── api/              # API route tests
│   ├── server/           # Server configuration tests
│   └── storage/          # Database layer tests
├── shared/               # Shared code tests
│   ├── chainLogic/       # Chain validation tests
│   ├── wordbank/         # Word bank tests
│   ├── routes/           # API contract tests
│   └── schema/           # Database schema tests
└── integration/          # Integration tests
    ├── frontend/         # Frontend integration tests
    └── backend/          # Backend integration tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test test/frontend/components/GameControls.test.tsx

# Run tests matching pattern
npm test -- --grep "API"
```

### Test Coverage

The test suite maintains high coverage standards:

- **Lines**: 80% minimum
- **Functions**: 80% minimum
- **Branches**: 75% minimum
- **Statements**: 80% minimum

Coverage reports are generated in the `coverage/` directory with HTML, JSON, and LCOV formats.

### Test Types

#### Unit Tests
- **Frontend Components**: Test React components in isolation
- **Hooks**: Test custom React hooks with QueryClient mocking
- **API Routes**: Test Express routes with mocked storage layer
- **Shared Logic**: Test pure functions and utilities

#### Integration Tests
- **API Integration**: Test complete API workflows
- **Game Flow**: Test end-to-end user interactions
- **Data Flow**: Test data transformations across layers

#### Test Utilities

The test suite includes:

- **React Testing Library**: Component rendering and interaction
- **Vitest**: Fast test runner with ESM support
- **Supertest**: HTTP assertion library for API testing
- **Mock Service Worker**: API mocking (when needed)

### Writing Tests

#### Component Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameControls } from '@/components/GameControls';

describe('GameControls', () => {
  it('should call onGuess when form is submitted', () => {
    const onGuess = vi.fn();
    render(<GameControls onGuess={onGuess} {...props} />);
    
    const input = screen.getByPlaceholderText(/enter word/i);
    fireEvent.change(input, { target: { value: 'House' } });
    fireEvent.submit(input.closest('form')!);
    
    expect(onGuess).toHaveBeenCalledWith('House');
  });
});
```

#### API Test Example

```typescript
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { registerPuzzleRoutes } from '@/api/puzzles';

describe('Puzzles API', () => {
  it('should return all puzzles', async () => {
    const app = express();
    app.use(express.json());
    registerPuzzleRoutes(app);
    
    const response = await request(app).get('/api/puzzles');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

### Continuous Integration

Tests are designed to run in CI/CD pipelines:

- Fast execution (< 30 seconds for full suite)
- Deterministic results (no flaky tests)
- Clear error messages
- Coverage reporting
- Parallel execution support

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
5. Write tests for new features
6. Ensure all tests pass: `npm test`
7. Ensure coverage thresholds are met: `npm run test:coverage`
8. Submit a pull request

### Testing Requirements

- All new features must include tests
- Test coverage must not decrease
- All tests must pass before merging
- Integration tests required for new API endpoints

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
