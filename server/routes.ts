import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.puzzles.list.path, async (req, res) => {
    const puzzles = await storage.getPuzzles();
    res.json(puzzles);
  });

  // Seed data check
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
      hints: ['A pet\'s home', 'Floats on water', 'Competition', 'Has wheels']
    },
    {
      difficulty: 'Easy',
      chain: ['Sun', 'Flower', 'Pot', 'Luck', 'Charm'],
      hints: ['Grows in gardens', 'Cooking container', 'Good fortune', 'Brings luck']
    },
    {
      difficulty: 'Medium',
      chain: ['Fire', 'Place', 'Holder', 'Space', 'Ship', 'Yard'],
      hints: ['Where fires burn', 'Contains things', 'Empty area', 'Vessel', 'Outdoor area']
    },
    {
      difficulty: 'Medium',
      chain: ['Time', 'Table', 'Cloth', 'Line', 'Dance'],
      hints: ['Schedule', 'Covers tables', 'String or cord', 'Movement to music']
    },
    {
      difficulty: 'Hard',
      chain: ['Snow', 'Ball', 'Park', 'Bench', 'Mark', 'Down', 'Town'],
      hints: ['Round ice', 'Recreation area', 'Seating', 'Target or sign', 'Direction', 'Urban area']
    }
  ];

  for (const p of puzzlesToSeed) {
    await storage.createPuzzle(p);
  }
  console.log('Seeded database with puzzles');
}
