import { pgTable, text, serial, integer, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const puzzles = pgTable("puzzles", {
  id: serial("id").primaryKey(),
  difficulty: text("difficulty").notNull(),
  chain: text("chain").array().notNull(),
  hints: text("hints").array().notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  puzzleId: integer("puzzle_id").notNull().references(() => puzzles.id),
  completionTime: integer("completion_time").notNull(),
  hintsUsed: integer("hints_used").notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  // Indexes for query performance
  puzzleIdIdx: index("leaderboard_puzzle_id_idx").on(table.puzzleId),
  scoreIdx: index("leaderboard_score_idx").on(table.score),
  createdAtIdx: index("leaderboard_created_at_idx").on(table.createdAt),
}));

export const insertPuzzleSchema = createInsertSchema(puzzles).omit({ id: true, createdAt: true });
export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({ id: true, createdAt: true, score: true });

export type Puzzle = typeof puzzles.$inferSelect;
export type InsertPuzzle = z.infer<typeof insertPuzzleSchema>;
export type LeaderboardEntry = typeof leaderboard.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardSchema>;
