import { describe, it, expect, beforeEach, vi } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { registerPuzzleRoutes } from '../../../api/puzzles';
import * as chainLogicModule from '../../../shared/chainLogic';
import * as wordbankModule from '../../../shared/wordbank';

vi.mock('../../../server/storage', () => ({
  storage: {
    getPuzzles: vi.fn(),
    createPuzzle: vi.fn(),
  },
}));

import { storage } from '../../../server/storage'; // Import the mocked 'storage' here

vi.mock('../../../../shared/chainLogic');
vi.mock('../../../../shared/wordbank');

describe('API: Puzzles Routes', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    registerPuzzleRoutes(app);
    vi.clearAllMocks(); // Clear mocks on the individual methods of the mocked storage object
  });

  describe('GET /api/puzzles', () => {
    it('should return all puzzles successfully', async () => {
      const mockPuzzles = [
        {
          id: 1,
          difficulty: 'Easy',
          chain: ['Dog', 'House', 'Boat'],
          hints: ['A place to live'],
          createdBy: 'system',
          createdAt: new Date().toISOString(),
        },
      ];
      storage.getPuzzles.mockResolvedValue(mockPuzzles);

      const response = await request(app).get('/api/puzzles');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPuzzles);
    });

    it('should handle storage errors', async () => {
      storage.getPuzzles.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/puzzles');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Failed to fetch puzzles' });
    });
  });

  describe('POST /api/puzzles', () => {
    it('should create a valid puzzle', async () => {
      const newPuzzle = {
        difficulty: 'Easy' as const,
        chain: ['Dog', 'House', 'Boat'],
        hints: ['A place to live'],
        createdBy: 'test-user',
      };

      const createdPuzzle = {
        id: 1,
        ...newPuzzle,
        createdAt: new Date().toISOString(),
      };

      vi.spyOn(wordbankModule, 'isValidWord').mockReturnValue(true);
      vi.spyOn(chainLogicModule, 'validateChain').mockReturnValue(true);
      storage.createPuzzle.mockResolvedValue(createdPuzzle);

      const response = await request(app)
        .post('/api/puzzles')
        .send(newPuzzle);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdPuzzle);
    });

    it('should reject puzzle with invalid words', async () => {
      const newPuzzle = {
        difficulty: 'Easy' as const,
        chain: ['InvalidWord', 'House', 'Boat'],
        hints: ['A place to live'],
      };

      vi.spyOn(wordbankModule, 'isValidWord').mockImplementation(
        (word) => word !== 'InvalidWord'
      );

      const response = await request(app)
        .post('/api/puzzles')
        .send(newPuzzle);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid words not in word bank');
    });

    it('should reject puzzle with invalid chain', async () => {
      const newPuzzle = {
        difficulty: 'Easy' as const,
        chain: ['Dog', 'Cat', 'Bird'],
        hints: ['A place to live'],
      };

      vi.spyOn(wordbankModule, 'isValidWord').mockReturnValue(true);
      vi.spyOn(chainLogicModule, 'validateChain').mockReturnValue(false);

      const response = await request(app)
        .post('/api/puzzles')
        .send(newPuzzle);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Invalid chain: words don't form valid compounds");
    });

    it('should handle invalid request body', async () => {
      const response = await request(app)
        .post('/api/puzzles')
        .send({ invalid: 'data' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid puzzle data');
    });

    it('should handle storage errors on create', async () => {
      const newPuzzle = {
        difficulty: 'Easy' as const,
        chain: ['Dog', 'House', 'Boat'],
        hints: ['A place to live'],
      };

      vi.spyOn(wordbankModule, 'isValidWord').mockReturnValue(true);
      vi.spyOn(chainLogicModule, 'validateChain').mockReturnValue(true);
      storage.createPuzzle.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/puzzles')
        .send(newPuzzle);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Failed to create puzzle');
    });
  });

  describe('POST /api/puzzles/validate', () => {
    it('should validate a valid chain', async () => {
      const chain = ['Dog', 'House', 'Boat'];

      vi.spyOn(chainLogicModule, 'validateChain').mockReturnValue(true);

      const response = await request(app)
        .post('/api/puzzles/validate')
        .send({ chain });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ valid: true });
    });

    it('should reject an invalid chain', async () => {
      const chain = ['Dog', 'Cat', 'Bird'];

      vi.spyOn(chainLogicModule, 'validateChain').mockReturnValue(false);
      vi.spyOn(chainLogicModule, 'canFormCompound')
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      const response = await request(app)
        .post('/api/puzzles/validate')
        .send({ chain });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ valid: false, invalidAt: 1 });
    });

    it('should handle invalid request body', async () => {
      const response = await request(app)
        .post('/api/puzzles/validate')
        .send({ invalid: 'data' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid request');
    });
  });
});
