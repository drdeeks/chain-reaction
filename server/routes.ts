import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { PAINT_COLORS } from "@shared/wordbank";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.puzzles.list.path, async (req, res) => {
    const puzzles = await storage.getPuzzles();
    res.json(puzzles);
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
      hints: ['A pet\'s home', 'Floats on water', 'Competition']
    },
    {
      difficulty: 'Easy',
      chain: ['Sun', 'Flower', 'Pot', 'Luck', 'Charm'],
      hints: ['Grows in gardens', 'Cooking container', 'Good fortune']
    },
    {
      difficulty: 'Easy',
      chain: ['Light', 'House', 'Keeper', 'Safe', 'Guard'],
      hints: ['Building structure', 'One who keeps', 'Secure place']
    },
    {
      difficulty: 'Medium',
      chain: ['Fire', 'Place', 'Holder', 'Cup', 'Board'],
      hints: ['Location', 'Contains things', 'Drinking vessel']
    },
    {
      difficulty: 'Medium',
      chain: ['Time', 'Table', 'Cloth', 'Line', 'Dance'],
      hints: ['Schedule', 'Covers tables', 'String or cord']
    },
    {
      difficulty: 'Medium',
      chain: ['Book', 'Mark', 'Down', 'Town', 'Ship'],
      hints: ['Sign or target', 'Direction', 'Urban area']
    },
    {
      difficulty: 'Hard',
      chain: ['Snow', 'Ball', 'Park', 'Bench', 'Press', 'Room', 'Mate'],
      hints: ['Round ice', 'Recreation area', 'Seating', 'Media gathering', 'Space']
    },
    {
      difficulty: 'Hard',
      chain: ['Water', 'Fall', 'Out', 'Door', 'Bell', 'Hop', 'Scotch'],
      hints: ['Cascade', 'Dispute', 'Entry', 'Rings', 'Jump']
    }
  ];

  for (const p of puzzlesToSeed) {
    await storage.createPuzzle(p);
  }
  console.log('Seeded database with paint color word puzzles');
}
