import type { Express } from "express";
import { storage } from "../server/storage";
import { api } from "@shared/routes";
import { validateChain, canFormCompound } from "@shared/chainLogic";
import { isValidWord } from "@shared/wordbank";

export function registerPuzzleRoutes(app: Express) {
  // Get all puzzles
  app.get(api.puzzles.list.path, async (req, res) => {
    try {
      const puzzles = await storage.getPuzzles();
      res.json(puzzles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch puzzles" });
    }
  });

  // Create puzzle
  app.post(api.puzzles.create.path, async (req, res) => {
    try {
      const body = api.puzzles.create.body.parse(req.body);
      
      // Validate all words are in word bank
      const invalidWords = body.chain.filter(word => !isValidWord(word));
      if (invalidWords.length > 0) {
        return res.status(400).json({ 
          message: `Invalid words not in word bank: ${invalidWords.join(', ')}` 
        });
      }
      
      if (!validateChain(body.chain)) {
        return res.status(400).json({ 
          message: "Invalid chain: words don't form valid compounds" 
        });
      }
      
      const puzzle = await storage.createPuzzle(body);
      res.status(201).json(puzzle);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid puzzle data", field: error.errors[0]?.path[0] });
      }
      res.status(500).json({ message: "Failed to create puzzle" });
    }
  });

  // Validate chain
  app.post(api.puzzles.validate.path, async (req, res) => {
    try {
      const body = api.puzzles.validate.body.parse(req.body);
      const valid = validateChain(body.chain);
      
      if (!valid) {
        for (let i = 0; i < body.chain.length - 1; i++) {
          if (!canFormCompound(body.chain[i], body.chain[i + 1])) {
            return res.json({ valid: false, invalidAt: i });
          }
        }
      }
      
      res.json({ valid });
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });
}
