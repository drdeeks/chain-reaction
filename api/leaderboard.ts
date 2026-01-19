import type { Express } from "express";
import { storage } from "../server/storage";
import { api } from "@shared/routes";

export function registerLeaderboardRoutes(app: Express) {
  // Get leaderboard
  app.get(api.leaderboard.list.path, async (req, res) => {
    try {
      const puzzleId = parseInt(req.params.puzzleId);
      if (isNaN(puzzleId)) {
        return res.status(400).json({ message: "Invalid puzzle ID" });
      }
      
      const entries = await storage.getLeaderboard(puzzleId);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Submit score
  app.post(api.leaderboard.submit.path, async (req, res) => {
    try {
      const body = api.leaderboard.submit.body.parse(req.body);
      const entry = await storage.submitScore(body);
      
      const allScores = await storage.getLeaderboard(body.puzzleId);
      const rank = allScores.findIndex(e => e.id === entry.id) + 1;
      
      res.status(201).json({ 
        id: entry.id, 
        score: entry.score, 
        rank 
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid score data" });
      }
      res.status(500).json({ message: "Failed to submit score" });
    }
  });
}
