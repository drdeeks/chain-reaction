import { db } from "./db";
import { puzzles, type InsertPuzzle, type Puzzle } from "@shared/schema";

export interface IStorage {
  getPuzzles(): Promise<Puzzle[]>;
  createPuzzle(puzzle: InsertPuzzle): Promise<Puzzle>;
}

export class DatabaseStorage implements IStorage {
  async getPuzzles(): Promise<Puzzle[]> {
    return await db.select().from(puzzles);
  }

  async createPuzzle(insertPuzzle: InsertPuzzle): Promise<Puzzle> {
    const [puzzle] = await db.insert(puzzles).values(insertPuzzle).returning();
    return puzzle;
  }
}

export const storage = new DatabaseStorage();
