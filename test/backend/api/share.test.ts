import { describe, it, expect, beforeEach, vi } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { registerShareRoutes } from '../../../api/share';

describe('API: Share Routes', () => {
  let app: Express;
  const originalEnv = process.env.BASE_URL;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    registerShareRoutes(app);
    vi.clearAllMocks();
    delete process.env.BASE_URL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalEnv) {
      process.env.BASE_URL = originalEnv;
    }
  });

  describe('POST /api/share', () => {
    it('should generate share link with default base URL', async () => {
      const shareData = {
        puzzleId: 1,
        completionTime: 5000,
        hintsUsed: 0,
      };

      const response = await request(app)
        .post('/api/share')
        .send(shareData)
        .set('host', 'example.com')
        .set('protocol', 'https');

      expect(response.status).toBe(200);
      expect(response.body.shareUrl).toContain('example.com');
      expect(response.body.shareUrl).toContain('puzzle=1');
      expect(response.body.shareText).toContain('puzzle #1');
      expect(response.body.shareText).toContain('5s');
      expect(response.body.shareText).toContain('0 hints');
    });

    it('should use BASE_URL environment variable when set', async () => {
      process.env.BASE_URL = 'https://custom-domain.com';
      const shareData = {
        puzzleId: 2,
        completionTime: 10000,
        hintsUsed: 1,
      };

      const response = await request(app)
        .post('/api/share')
        .send(shareData);

      expect(response.status).toBe(200);
      expect(response.body.shareUrl).toBe('https://custom-domain.com/?puzzle=2');
      expect(response.body.shareText).toContain('10s');
      expect(response.body.shareText).toContain('1 hints');
    });

    it('should format completion time correctly', async () => {
      const shareData = {
        puzzleId: 1,
        completionTime: 12345, // 12.345 seconds
        hintsUsed: 2,
      };

      const response = await request(app)
        .post('/api/share')
        .send(shareData);

      expect(response.status).toBe(200);
      expect(response.body.shareText).toContain('12s');
    });

    it('should handle invalid request body', async () => {
      const response = await request(app)
        .post('/api/share')
        .send({ invalid: 'data' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Failed to generate share link');
    });
  });
});
