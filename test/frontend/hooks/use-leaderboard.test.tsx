import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../setup';
import { useLeaderboard, useSubmitScore, useGenerateShare } from '../../../app/src/hooks/use-leaderboard';

describe('useLeaderboard Hook', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    global.fetch = vi.fn();
  });

  it('should fetch leaderboard for valid puzzle ID', async () => {
    const mockEntries = [
      {
        id: 1,
        playerName: 'Player1',
        puzzleId: 1,
        completionTime: 5000,
        hintsUsed: 0,
        score: 9950,
        createdAt: new Date(),
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEntries,
    });

    const { result } = renderHook(() => useLeaderboard(1), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockEntries);
    expect(global.fetch).toHaveBeenCalledWith('/api/leaderboard/1');
  });

  it('should not fetch for invalid puzzle ID', () => {
    const { result } = renderHook(() => useLeaderboard(0), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(result.current.isFetching).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should handle fetch errors', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useLeaderboard(1), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useSubmitScore Hook', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    global.fetch = vi.fn();
  });

  it('should submit score successfully', async () => {
    const scoreData = {
      playerName: 'TestPlayer',
      puzzleId: 1,
      completionTime: 5000,
      hintsUsed: 0,
    };

    const response = {
      id: 1,
      score: 9950,
      rank: 1,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => response,
    });

    const { result } = renderHook(() => useSubmitScore(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(scoreData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(response);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/leaderboard',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(scoreData),
      })
    );
  });

  it('should handle API errors', async () => {
    const scoreData = {
      playerName: 'TestPlayer',
      puzzleId: 1,
      completionTime: 5000,
      hintsUsed: 0,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid score data' }),
    });

    const { result } = renderHook(() => useSubmitScore(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(scoreData);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Invalid score data');
  });
});

describe('useGenerateShare Hook', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    global.fetch = vi.fn();
  });

  it('should generate share link successfully', async () => {
    const shareData = {
      puzzleId: 1,
      completionTime: 5000,
      hintsUsed: 0,
    };

    const response = {
      shareUrl: 'https://example.com/?puzzle=1',
      shareText: 'I completed Chain Reaction puzzle #1 in 5s with 0 hints!',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => response,
    });

    const { result } = renderHook(() => useGenerateShare(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(shareData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(response);
  });

  it('should handle API errors', async () => {
    const shareData = {
      puzzleId: 1,
      completionTime: 5000,
      hintsUsed: 0,
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useGenerateShare(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(shareData);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
