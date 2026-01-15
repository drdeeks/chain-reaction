import { describe, it, expect } from 'vitest';
import { buildUrl } from '../shared/routes';

describe('routes', () => {
  describe('buildUrl', () => {
    it('should build URL without params', () => {
      const url = buildUrl('/api/puzzles');
      expect(url).toBe('/api/puzzles');
    });

    it('should replace single param', () => {
      const url = buildUrl('/api/leaderboard/:puzzleId', { puzzleId: 123 });
      expect(url).toBe('/api/leaderboard/123');
    });

    it('should replace multiple params', () => {
      const url = buildUrl('/api/:resource/:id', { resource: 'puzzles', id: 456 });
      expect(url).toBe('/api/puzzles/456');
    });

    it('should handle string params', () => {
      const url = buildUrl('/api/:name', { name: 'test' });
      expect(url).toBe('/api/test');
    });

    it('should throw error if required param missing', () => {
      expect(() => buildUrl('/api/:puzzleId', {})).toThrow('Missing required URL parameter');
    });

    it('should not modify URL if no placeholders', () => {
      const url = buildUrl('/api/static/path', { unused: 'param' });
      expect(url).toBe('/api/static/path');
    });
  });
});
