import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../setup';
import { useCreatePuzzle, useValidateChain } from '../../../app/src/hooks/use-create-puzzle';

describe('useCreatePuzzle Hook', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    global.fetch = vi.fn();
  });

  it('should create puzzle successfully', async () => {
    const puzzleData = {
      difficulty: 'Easy' as const,
      chain: ['Dog', 'House', 'Boat'],
      hints: ['A place to live'],
      createdBy: 'test-user',
    };

    const createdPuzzle = {
      id: 1,
      ...puzzleData,
      createdAt: new Date(),
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => createdPuzzle,
    });

    const { result } = renderHook(() => useCreatePuzzle(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(puzzleData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(createdPuzzle);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/puzzles',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puzzleData),
      })
    );
  });

  it('should reject puzzle with mismatched hints count', async () => {
    const puzzleData = {
      difficulty: 'Easy' as const,
      chain: ['Dog', 'House', 'Boat'], // 3 words = 1 hidden word
      hints: ['Hint 1', 'Hint 2'], // 2 hints (should be 1)
      createdBy: 'test-user',
    };

    const { result } = renderHook(() => useCreatePuzzle(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(puzzleData);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toContain('Hints count');
  });

  it('should handle API errors', async () => {
    const puzzleData = {
      difficulty: 'Easy' as const,
      chain: ['Dog', 'House', 'Boat'],
      hints: ['A place to live'],
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid chain' }),
    });

    const { result } = renderHook(() => useCreatePuzzle(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(puzzleData);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Invalid chain');
  });
});

describe('useValidateChain Hook', () => {
  let queryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    global.fetch = vi.fn();
  });

  it('should validate a valid chain', async () => {
    const chain = ['Dog', 'House', 'Boat'];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: true }),
    });

    const { result } = renderHook(() => useValidateChain(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(chain);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ valid: true });
  });

  it('should reject chain with less than 2 words', async () => {
    const chain = ['Dog'];

    const { result } = renderHook(() => useValidateChain(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(chain);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toContain('at least 2 words');
  });

  it('should handle validation errors', async () => {
    const chain = ['Dog', 'Cat', 'Bird'];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: false, invalidAt: 1 }),
    });

    const { result } = renderHook(() => useValidateChain(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate(chain);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ valid: false, invalidAt: 1 });
  });
});
