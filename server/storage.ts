import { db } from "./db";
import { puzzles, leaderboard, type InsertPuzzle, type Puzzle, type LeaderboardEntry, type InsertLeaderboardEntry } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  getPuzzles(): Promise<Puzzle[]>;
  createPuzzle(puzzle: InsertPuzzle): Promise<Puzzle>;
  getLeaderboard(puzzleId: number): Promise<LeaderboardEntry[]>;
  submitScore(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
}

export class DatabaseStorage implements IStorage {
  async getPuzzles(): Promise<Puzzle[]> {
    return await db.select().from(puzzles);
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const [puzzle] = await db.insert(puzzles).values(insertPuzzle).returning();
    return puzzle;
  }

  async getLeaderboard(puzzleId: number): Promise<LeaderboardEntry[]> {
    return await db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.puzzleId, puzzleId))
      .orderBy(desc(leaderboard.score))
      .limit(100);
  }

  async submitScore(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    // BUG FIX #7: Convert milliseconds to seconds for score calculation
    const timeInSeconds = Math.floor(entry.completionTime / 1000);
    const score = Math.max(0, 10000 - (timeInSeconds * 10) - (entry.hintsUsed * 500));
    const [result] = await db
      .insert(leaderboard)
      .values({ ...entry, score })
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
