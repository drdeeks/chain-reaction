import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, buildUrl } from "@shared/routes";
import { validateChain, canFormCompound } from "@shared/chainLogic"; // BUG FIX #9: Import canFormCompound

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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
      
      // BUG FIX #9: Remove redundant import, use already imported function
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

  // Generate share link
  app.post(api.share.generate.path, async (req, res) => {
    try {
      const body = api.share.generate.body.parse(req.body);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const shareUrl = `${baseUrl}/?puzzle=${body.puzzleId}`;
      const shareText = `I completed Chain Reaction puzzle #${body.puzzleId} in ${Math.floor(body.completionTime / 1000)}s with ${body.hintsUsed} hints! Can you beat my score?`;
      
      res.json({ shareUrl, shareText });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate share link" });
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getPuzzles();
  if (existing.length > 0) return;

  const puzzlesToSeed = [
    {
      difficulty: 'Easy',
      chain: ['Dog', 'House', 'Boat', 'Race', 'Car'],
      hints: ['A place to live', 'Floats on water', 'Competition'], // BUG FIX #4: 3 hints for 3 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Easy',
      chain: ['Sun', 'Flower', 'Pot', 'Luck', 'Charm'],
      hints: ['Grows in gardens', 'Container', 'Good fortune'], // BUG FIX #4: 3 hints for 3 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Easy',
      chain: ['Light', 'House', 'Keeper', 'Safe', 'Guard'],
      hints: ['Building structure', 'One who keeps', 'Secure place'], // BUG FIX #4: 3 hints for 3 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Medium',
      chain: ['Fire', 'Side', 'Show', 'Down', 'Town'],
      hints: ['Edge or border', 'Display', 'Direction'], // BUG FIX #4: 3 hints for 3 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Medium',
      chain: ['Book', 'Mark', 'Down', 'Town', 'Ship'],
      hints: ['Sign or target', 'Direction', 'Urban area'], // BUG FIX #4: 3 hints for 3 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Medium',
      chain: ['Water', 'Fall', 'Out', 'Side', 'Walk'],
      hints: ['To drop', 'Outside', 'Edge'], // BUG FIX #4: 3 hints for 3 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Hard',
      chain: ['Snow', 'Board', 'Walk', 'Way', 'Side', 'Show'],
      hints: ['Plank', 'To move on foot', 'Path', 'Edge'], // BUG FIX #4: 4 hints for 4 hidden words
      createdBy: 'system'
    },
    {
      difficulty: 'Hard',
      chain: ['Key', 'Board', 'Room', 'Mate', 'Ship', 'Yard'],
      hints: ['Plank', 'Space', 'Friend', 'Vessel'], // BUG FIX #4: 4 hints for 4 hidden words
      createdBy: 'system'
    }
  ];

  // BUG FIX #3: Validate all seed puzzles before inserting
  for (const p of puzzlesToSeed) {
    if (!validateChain(p.chain)) {
      console.error(`Invalid seed puzzle: ${p.chain.join(' -> ')}`);
      continue;
    }
    await storage.createPuzzle(p);
  }
  console.log('✓ Seeded database with puzzles');
}
