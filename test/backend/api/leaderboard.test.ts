import { describe, it, expect, beforeEach, vi } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { registerLeaderboardRoutes } from '../../../api/leaderboard';

vi.mock('../../../server/storage', () => ({
  storage: {
    getLeaderboard: vi.fn(),
    submitScore: vi.fn(),
  },
}));

import { storage } from '../../../server/storage'; // Import the mocked 'storage' here

describe('API: Leaderboard Routes', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    registerLeaderboardRoutes(app);
    vi.clearAllMocks();
  });

  describe('GET /api/leaderboard/:puzzleId', () => {
    it('should return leaderboard entries for valid puzzle ID', async () => {
      const mockEntries = [
        {
          id: 1,
          playerName: 'Player1',
          puzzleId: 1,
          completionTime: 5000,
          hintsUsed: 0,
          score: 9950,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          playerName: 'Player2',
          puzzleId: 1,
          completionTime: 10000,
          hintsUsed: 1,
          score: 9400,
          createdAt: new Date().toISOString(),
        },
      ];

      storage.getLeaderboard.mockResolvedValue(mockEntries);

      const response = await request(app).get('/api/leaderboard/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEntries);
    });

    it('should reject invalid puzzle ID', async () => {
      const response = await request(app).get('/api/leaderboard/invalid');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid puzzle ID');
    });

    it('should handle storage errors', async () => {
      storage.getLeaderboard.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/leaderboard/1');

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Failed to fetch leaderboard');
    });
  });

  describe('POST /api/leaderboard', () => {
    it('should submit a valid score', async () => {
      const scoreData = {
        playerName: 'TestPlayer',
        puzzleId: 1,
        completionTime: 5000,
        hintsUsed: 0,
      };

      const createdEntry = {
        id: 1,
        ...scoreData,
        score: 9950,
        createdAt: new Date().toISOString(),
      };

      const allScores = [createdEntry];

      storage.submitScore.mockResolvedValue(createdEntry);
      storage.getLeaderboard.mockResolvedValue(allScores);

      const response = await request(app)
        .post('/api/leaderboard')
        .send(scoreData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        score: 9950,
        rank: 1,
      });
    });

    it('should calculate correct rank', async () => {
      const scoreData = {
        playerName: 'TestPlayer',
        puzzleId: 1,
        completionTime: 10000,
        hintsUsed: 1,
      };

      const existingEntry = {
        id: 1,
        playerName: 'Player1',
        puzzleId: 1,
        completionTime: 5000,
        hintsUsed: 0,
        score: 9950,
        createdAt: new Date().toISOString(),
      };

      const newEntry = {
        id: 2,
        ...scoreData,
        score: 9400,
        createdAt: new Date().toISOString(),
      };

      storage.submitScore.mockResolvedValue(newEntry);
      storage.getLeaderboard.mockResolvedValue([existingEntry, newEntry]);

      const response = await request(app)
        .post('/api/leaderboard')
        .send(scoreData);

      expect(response.status).toBe(201);
      expect(response.body.rank).toBe(2);
    });

    it('should handle invalid request body', async () => {
      const response = await request(app)
        .post('/api/leaderboard')
        .send({ invalid: 'data' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid score data');
    });

    it('should handle storage errors', async () => {
      const scoreData = {
        playerName: 'TestPlayer',
        puzzleId: 1,
        completionTime: 5000,
        hintsUsed: 0,
      };

      storage.submitScore.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/leaderboard')
        .send(scoreData);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Failed to submit score');
    });
  });
});
