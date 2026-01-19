# Test Suite Documentation

## Overview

This directory contains a comprehensive enterprise-grade test suite for Chain Reaction, organized by application layer and test type.

## Directory Structure

```
test/
├── frontend/              # Frontend tests
│   ├── components/        # React component tests
│   │   ├── ChainNode.test.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   └── GameControls.test.tsx
│   ├── hooks/            # Custom hook tests
│   │   ├── use-puzzles.test.ts
│   │   ├── use-create-puzzle.test.ts
│   │   └── use-leaderboard.test.ts
│   ├── pages/            # Page component tests
│   └── lib/              # Utility function tests
├── backend/              # Backend tests
│   ├── api/              # API route tests
│   │   ├── puzzles.test.ts
│   │   ├── leaderboard.test.ts
│   │   └── share.test.ts
│   ├── server/           # Server configuration tests
│   └── storage/          # Database layer tests
├── shared/               # Shared code tests
│   ├── chainLogic/       # Chain validation tests
│   │   └── chainLogic.test.ts
│   ├── wordbank/         # Word bank tests
│   │   └── wordbank.test.ts
│   ├── routes/           # API contract tests
│   │   └── routes.test.ts
│   └── schema/           # Database schema tests
├── integration/          # Integration tests
│   ├── frontend/         # Frontend integration tests
│   │   └── game-flow.test.tsx
│   └── backend/          # Backend integration tests
│       └── api-integration.test.ts
├── helpers/              # Test utilities
│   └── mock-storage.ts   # Mock storage implementation
├── setup.ts              # Test setup and configuration
└── README.md             # This file
```

## Test Types

### Unit Tests

**Location**: `test/frontend/`, `test/backend/`, `test/shared/`

Unit tests verify individual components, functions, and modules in isolation.

- **Components**: Test React components with mocked dependencies
- **Hooks**: Test custom React hooks with QueryClient mocking
- **API Routes**: Test Express routes with mocked storage
- **Shared Logic**: Test pure functions and utilities

### Integration Tests

**Location**: `test/integration/`

Integration tests verify interactions between multiple components or layers.

- **API Integration**: Test complete API workflows
- **Game Flow**: Test end-to-end user interactions
- **Data Flow**: Test data transformations across layers

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test test/frontend/components/GameControls.test.tsx

# Run tests matching pattern
npm test -- --grep "API"
```

## Coverage Requirements

- **Lines**: 80% minimum
- **Functions**: 80% minimum
- **Branches**: 75% minimum
- **Statements**: 80% minimum

Coverage reports are generated in `coverage/` directory.

## Test Utilities

### Mock Storage

Located in `test/helpers/mock-storage.ts`, provides a mock implementation of the storage interface for testing API routes without a database.

### Test Query Client

Located in `test/setup.ts`, provides a test QueryClient configured for fast, isolated tests.

## Writing New Tests

### Component Test Template

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '@/components/ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName {...props} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Hook Test Template

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../setup';
import { useHookName } from '@/hooks/use-hook-name';

describe('useHookName', () => {
  it('should work correctly', async () => {
    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useHookName(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
```

### API Test Template

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { registerRoutes } from '@/api/routes';

describe('API Routes', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    registerRoutes(app);
  });

  it('should handle requests', async () => {
    const response = await request(app).get('/api/endpoint');
    expect(response.status).toBe(200);
  });
});
```

## Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Mocking**: Mock external dependencies (APIs, databases, etc.)
3. **Coverage**: Aim for high coverage but focus on critical paths
4. **Clarity**: Use descriptive test names and clear assertions
5. **Speed**: Keep tests fast (< 100ms per test when possible)
6. **Maintainability**: Update tests when code changes

## Troubleshooting

### Import Errors

If you see import resolution errors, check:
- Path aliases are correctly configured in `vitest.config.ts`
- Import paths use the `@/` alias for app code
- Import paths use `@shared/` for shared code

### Mock Issues

If mocks aren't working:
- Ensure `vi.mock()` is called before imports
- Check that mock implementations match the actual interface
- Verify mock cleanup in `beforeEach` hooks

### Coverage Issues

If coverage is low:
- Check that test files are included in `vitest.config.ts`
- Verify coverage exclusions are appropriate
- Ensure all code paths are tested
