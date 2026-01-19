import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../setup';
import Game from '../../../app/src/pages/Game';

// Mock the hooks
vi.mock('../../../app/src/hooks/use-puzzles', () => ({
  usePuzzles: () => ({
    data: [
      {
        id: 1,
        difficulty: 'Easy',
        chain: ['Dog', 'House', 'Boat', 'Race', 'Car'],
        hints: ['A place to live', 'Floats on water', 'Competition'],
        createdBy: 'system',
        createdAt: new Date(),
      },
    ],
    isLoading: false,
    isError: false,
  }),
}));

vi.mock('../../../app/src/hooks/use-leaderboard', () => ({
  useLeaderboard: () => ({
    data: [],
    isLoading: false,
  }),
  useSubmitScore: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
  useGenerateShare: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe('Game Flow Integration', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  it('should render game with puzzle data', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Game />
      </QueryClientProvider>
    );

    await waitFor(async () => {
      expect(await screen.findByText('Dog')).toBeInTheDocument();
    });
  });

  it('should allow user to input guesses', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Game />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText(/type your guess/i);
      expect(input).toBeInTheDocument();
      
      fireEvent.change(input, { target: { value: 'House' } });
      expect(input).toHaveValue('House');
    });
  });

  it('should show hint button and allow hints', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Game />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const hintButton = screen.getByRole('button', { name: /hint/i });
      expect(hintButton).toBeInTheDocument();
      
      fireEvent.click(hintButton);
      // Hint should be displayed
    });
  });
});
