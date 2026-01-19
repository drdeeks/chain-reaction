import { describe, it, expect, beforeEach, vi } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { registerRoutes } from '../../../api';
import { storage } from '../../../server/storage'; // Import storage directly

vi.mock('../../../server/storage', () => ({
  storage: { // This is the mocked storage object
    getPuzzles: vi.fn(),
    createPuzzle: vi.fn(),
    getLeaderboard: vi.fn(),
    submitScore: vi.fn(),
  },
}));

describe('API Integration Tests', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    // Clear mocks on the individual methods of the mocked storage object
    vi.clearAllMocks(); 
  });

  it('should handle complete puzzle creation and retrieval flow', async () => {
    const mockPuzzle = {
      id: 1,
      difficulty: 'Easy',
      chain: ['Dog', 'House', 'Boat'],
      hints: ['A place to live'],
      createdBy: 'test-user',
      createdAt: new Date(),
    };

    // Now set the return values for the mocked methods
    storage.getPuzzles.mockResolvedValue([mockPuzzle]);
    storage.createPuzzle.mockResolvedValue(mockPuzzle);
    storage.getLeaderboard.mockResolvedValue([]);
    storage.submitScore.mockResolvedValue({
      id: 1,
      playerName: 'TestPlayer',
      puzzleId: 1,
      completionTime: 5000,
      hintsUsed: 0,
      score: 9950,
      createdAt: new Date(),
    });

    await registerRoutes(app);

    // Get puzzles
    const getResponse = await request(app).get('/api/puzzles');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveLength(1);

    // Submit score
    const scoreResponse = await request(app)
      .post('/api/leaderboard')
      .send({
        playerName: 'TestPlayer',
        puzzleId: 1,
        completionTime: 5000,
        hintsUsed: 0,
      });

    expect(scoreResponse.status).toBe(201);
    expect(scoreResponse.body.score).toBe(9950);

    // Get leaderboard
    const leaderboardResponse = await request(app).get('/api/leaderboard/1');
    expect(leaderboardResponse.status).toBe(200);
  });

  it('should handle error scenarios gracefully', async () => {
    storage.getPuzzles.mockRejectedValue(new Error('Database error'));
    storage.createPuzzle.mockRejectedValue(new Error('Database error'));
    storage.getLeaderboard.mockRejectedValue(new Error('Database error'));
    storage.submitScore.mockRejectedValue(new Error('Database error'));

    await registerRoutes(app);

    const response = await request(app).get('/api/puzzles');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Failed to fetch puzzles');
  });
});
