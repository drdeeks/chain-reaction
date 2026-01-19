import type { Express } from "express";
import { registerPuzzleRoutes } from "./puzzles";
import { registerLeaderboardRoutes } from "./leaderboard";
import { registerShareRoutes } from "./share";
import { storage } from "../server/storage";
import { validateChain } from "@shared/chainLogic";

export async function registerRoutes(app: Express) {
  // Register all API routes
  registerPuzzleRoutes(app);
  registerLeaderboardRoutes(app);
  registerShareRoutes(app);

  // Seed database on startup
  await seedDatabase();
}

async function seedDatabase() {
  // Skip seeding if using mock storage (it already has seed data)
  if (!process.env.DATABASE_URL) {
    return;
  }
  
  const existing = await storage.getPuzzles();
  if (existing.length > 0) return;

  const puzzlesToSeed = [
    {
      difficulty: 'Easy',
      chain: ['Dog', 'House', 'Boat', 'Race', 'Car'],
      hints: ['A place to live', 'Floats on water', 'Competition'],
      createdBy: 'system'
    },
    {
      difficulty: 'Easy',
      chain: ['Sun', 'Flower', 'Pot', 'Luck', 'Charm'],
      hints: ['Grows in gardens', 'Container', 'Good fortune'],
      createdBy: 'system'
    },
    {
      difficulty: 'Easy',
      chain: ['Light', 'House', 'Keeper', 'Safe', 'Guard'],
      hints: ['Building structure', 'One who keeps', 'Secure place'],
      createdBy: 'system'
    },
    {
      difficulty: 'Medium',
      chain: ['Fire', 'Side', 'Show', 'Down', 'Town'],
      hints: ['Edge or border', 'Display', 'Direction'],
      createdBy: 'system'
    },
    {
      difficulty: 'Medium',
      chain: ['Book', 'Mark', 'Down', 'Town', 'Ship'],
      hints: ['Sign or target', 'Direction', 'Urban area'],
      createdBy: 'system'
    },
    {
      difficulty: 'Medium',
      chain: ['Water', 'Fall', 'Out', 'Side', 'Walk'],
      hints: ['To drop', 'Outside', 'Edge'],
      createdBy: 'system'
    },
    {
      difficulty: 'Hard',
      chain: ['Snow', 'Board', 'Walk', 'Way', 'Side', 'Show'],
      hints: ['Plank', 'To move on foot', 'Path', 'Edge'],
      createdBy: 'system'
    },
    {
      difficulty: 'Hard',
      chain: ['Key', 'Board', 'Room', 'Mate', 'Ship', 'Yard'],
      hints: ['Plank', 'Space', 'Friend', 'Vessel'],
      createdBy: 'system'
    }
  ];

  // Validate all seed puzzles before inserting
  for (const p of puzzlesToSeed) {
    if (!validateChain(p.chain)) {
      console.error(`Invalid seed puzzle: ${p.chain.join(' -> ')}`);
      continue;
    }
    await storage.createPuzzle(p);
  }
  console.log('✓ Seeded database with puzzles');
}
