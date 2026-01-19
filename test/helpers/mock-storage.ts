import { vi } from 'vitest';
import type { IStorage, Puzzle, LeaderboardEntry, InsertPuzzle, InsertLeaderboardEntry } from '../../server/storage';

export function createMockStorage(): IStorage {
  const puzzles: Puzzle[] = [];
  const leaderboard: LeaderboardEntry[] = [];

  return {
    getPuzzles: vi.fn().mockResolvedValue(puzzles),
    createPuzzle: vi.fn().mockImplementation(async (puzzle: InsertPuzzle) => {
      const newPuzzle: Puzzle = {
        id: puzzles.length + 1,
        ...puzzle,
        createdAt: new Date(),
      };
      puzzles.push(newPuzzle);
      return newPuzzle;
    }),
    getLeaderboard: vi.fn().mockImplementation(async (puzzleId: number) => {
      return leaderboard
        .filter(entry => entry.puzzleId === puzzleId)
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);
    }),
    submitScore: vi.fn().mockImplementation(async (entry: InsertLeaderboardEntry) => {
      const timeInSeconds = Math.floor(entry.completionTime / 1000);
      const score = Math.max(0, 10000 - (timeInSeconds * 10) - (entry.hintsUsed * 500));
      
      const existing = leaderboard.find(
        e => e.puzzleId === entry.puzzleId && e.playerName === entry.playerName
      );
      
      if (existing) {
        return existing;
      }
      
      const newEntry: LeaderboardEntry = {
        id: leaderboard.length + 1,
        ...entry,
        score,
        createdAt: new Date(),
      };
      leaderboard.push(newEntry);
      return newEntry;
    }),
  };
}
