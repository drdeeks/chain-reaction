import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const puzzles = pgTable("puzzles", {
  id: serial("id").primaryKey(),
  difficulty: text("difficulty").notNull(), // Easy, Medium, Hard
  chain: text("chain").array().notNull(),
  hints: text("hints").array().notNull(),
});

export const insertPuzzleSchema = createInsertSchema(puzzles).omit({ id: true });

export type Puzzle = typeof puzzles.$inferSelect;
export type InsertPuzzle = z.infer<typeof insertPuzzleSchema>;

export type PuzzleResponse = Puzzle;
