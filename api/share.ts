import type { Express } from "express";
import { api } from "@shared/routes";

export function registerShareRoutes(app: Express) {
  // Generate share link
  app.post(api.share.generate.path, async (req, res) => {
    try {
      const body = api.share.generate.body.parse(req.body);
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      const shareUrl = `${baseUrl}/?puzzle=${body.puzzleId}`;
      const shareText = `I completed Chain Reaction puzzle #${body.puzzleId} in ${Math.floor(body.completionTime / 1000)}s with ${body.hintsUsed} hints! Can you beat my score?`;
      
      res.json({ shareUrl, shareText });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate share link" });
    }
  });
}
