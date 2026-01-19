import { getDb } from "./db";
import { puzzles, leaderboard, type InsertPuzzle, type Puzzle, type LeaderboardEntry, type InsertLeaderboardEntry } from "@shared/schema";
import { desc, eq, and } from "drizzle-orm";

export interface IStorage {
  getPuzzles(): Promise<Puzzle[]>;
  createPuzzle(puzzle: InsertPuzzle): Promise<Puzzle>;
  getLeaderboard(puzzleId: number): Promise<LeaderboardEntry[]>;
  submitScore(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry>;
}

export class DatabaseStorage implements IStorage {
  async getPuzzles(): Promise<Puzzle[]> {
    const db = getDb();
    if (!db) throw new Error("Database not available");
    return await db.select().from(puzzles);
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const db = getDb();
    if (!db) throw new Error("Database not available");
    const [puzzle] = await db.insert(puzzles).values(insertPuzzle).returning();
    return puzzle;
  }

  async getLeaderboard(puzzleId: number): Promise<LeaderboardEntry[]> {
    const db = getDb();
    if (!db) throw new Error("Database not available");
    return await db
      .select()
      .from(leaderboard)
      .where(eq(leaderboard.puzzleId, puzzleId))
      .orderBy(desc(leaderboard.score))
      .limit(100);
  }

  async submitScore(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    const db = getDb();
    if (!db) throw new Error("Database not available");
    
    // Check for duplicate submissions to prevent duplicates
    const existing = await db
      .select()
      .from(leaderboard)
      .where(
        and(
          eq(leaderboard.puzzleId, entry.puzzleId),
          eq(leaderboard.playerName, entry.playerName)
        )
      )
      .limit(1);
    
    if (existing.length > 0) {
      // Return existing score instead of creating duplicate
      return existing[0];
    }
    
    // Convert milliseconds to seconds for score calculation
    const timeInSeconds = Math.floor(entry.completionTime / 1000);
    const score = Math.max(0, 10000 - (timeInSeconds * 10) - (entry.hintsUsed * 500));
    const [result] = await db
      .insert(leaderboard)
      .values({ ...entry, score })
      .returning();
    return result;
  }
}

// Mock storage for development when DATABASE_URL is not set
export class MockStorage implements IStorage {
  private puzzles: Puzzle[] = [
    {
      id: 1,
      difficulty: 'Easy',
      chain: ['Dog', 'House', 'Boat', 'Race', 'Car'],
      hints: ['A place to live', 'Floats on water', 'Competition'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 2,
      difficulty: 'Easy',
      chain: ['Sun', 'Flower', 'Pot', 'Luck', 'Charm'],
      hints: ['Grows in gardens', 'Container', 'Good fortune'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 3,
      difficulty: 'Easy',
      chain: ['Light', 'House', 'Keeper', 'Safe', 'Guard'],
      hints: ['Building structure', 'One who keeps', 'Secure place'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 4,
      difficulty: 'Medium',
      chain: ['Fire', 'Side', 'Show', 'Down', 'Town'],
      hints: ['Edge or border', 'Display', 'Direction'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 5,
      difficulty: 'Medium',
      chain: ['Book', 'Mark', 'Down', 'Town', 'Ship'],
      hints: ['Sign or target', 'Direction', 'Urban area'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 6,
      difficulty: 'Medium',
      chain: ['Water', 'Fall', 'Out', 'Side', 'Walk'],
      hints: ['To drop', 'Outside', 'Edge'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 7,
      difficulty: 'Hard',
      chain: ['Snow', 'Board', 'Walk', 'Way', 'Side', 'Show'],
      hints: ['Plank', 'To move on foot', 'Path', 'Edge'],
      createdBy: 'system',
      createdAt: new Date(),
    },
    {
      id: 8,
      difficulty: 'Hard',
      chain: ['Key', 'Board', 'Room', 'Mate', 'Ship', 'Yard'],
      hints: ['Plank', 'Space', 'Friend', 'Vessel'],
      createdBy: 'system',
      createdAt: new Date(),
    },
  ];
  
  private leaderboard: LeaderboardEntry[] = [];
  private nextId = 9;

  async getPuzzles(): Promise<Puzzle[]> {
    return Promise.resolve(this.puzzles);
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const puzzle: Puzzle = {
      id: this.nextId++,
      ...insertPuzzle,
      createdBy: insertPuzzle.createdBy ?? null,
      createdAt: new Date(),
    };
    this.puzzles.push(puzzle);
    return Promise.resolve(puzzle);
  }

  async getLeaderboard(puzzleId: number): Promise<LeaderboardEntry[]> {
    const entries = this.leaderboard
      .filter(e => e.puzzleId === puzzleId)
      .sort((a, b) => b.score - a.score)
      .slice(0, 100);
    return Promise.resolve(entries);
  }

  async submitScore(entry: InsertLeaderboardEntry): Promise<LeaderboardEntry> {
    // Check for duplicate submissions
    const existing = this.leaderboard.find(
      e => e.puzzleId === entry.puzzleId && e.playerName === entry.playerName
    );
    
    if (existing) {
      return Promise.resolve(existing);
    }
    
    // Convert milliseconds to seconds for score calculation
    const timeInSeconds = Math.floor(entry.completionTime / 1000);
    const score = Math.max(0, 10000 - (timeInSeconds * 10) - (entry.hintsUsed * 500));
    
    const leaderboardEntry: LeaderboardEntry = {
      id: this.leaderboard.length + 1,
      ...entry,
      score,
      createdAt: new Date(),
    };
    
    this.leaderboard.push(leaderboardEntry);
    return Promise.resolve(leaderboardEntry);
  }
}

// Use mock storage if DATABASE_URL is not set
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MockStorage();
