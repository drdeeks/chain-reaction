import { describe, it, expect } from 'vitest';
import { canFormCompound, validateChain, generateHint, findValidNextWords } from '../shared/chainLogic';

describe('chainLogic', () => {
  describe('canFormCompound', () => {
    it('should validate known compound words', () => {
      expect(canFormCompound('Dog', 'House')).toBe(true);
      expect(canFormCompound('House', 'Boat')).toBe(true);
      expect(canFormCompound('Fire', 'Side')).toBe(true);
    });

    it('should handle case insensitivity', () => {
      expect(canFormCompound('dog', 'house')).toBe(true);
      expect(canFormCompound('DOG', 'HOUSE')).toBe(true);
      expect(canFormCompound('Dog', 'house')).toBe(true);
    });

    it('should reject invalid compounds', () => {
      expect(canFormCompound('Dog', 'Cat')).toBe(false);
      expect(canFormCompound('Random', 'Words')).toBe(false);
    });

    it('should handle whitespace', () => {
      expect(canFormCompound('Fire', 'Side')).toBe(true);
      expect(canFormCompound('Side', 'Show')).toBe(true);
    });
  });

  describe('validateChain', () => {
    it('should validate complete valid chains', () => {
      expect(validateChain(['Dog', 'House', 'Boat', 'Race', 'Car'])).toBe(true);
    });

    it('should reject chains with invalid links', () => {
      expect(validateChain(['Dog', 'Cat', 'Bird'])).toBe(false);
      expect(validateChain(['Random', 'Invalid', 'Chain'])).toBe(false);
    });

    it('should reject chains with less than 2 words', () => {
      expect(validateChain(['Single'])).toBe(false);
      expect(validateChain([])).toBe(false);
    });

    it('should validate partial chains', () => {
      expect(validateChain(['Water', 'Fall'])).toBe(true);
      expect(validateChain(['Book', 'Mark'])).toBe(true);
    });
  });

  describe('generateHint', () => {
    it('should return predefined hints for known words', () => {
      expect(generateHint('house')).toBe('A place to live');
      expect(generateHint('boat')).toBe('Floats on water');
      expect(generateHint('car')).toBe('Vehicle');
    });

    it('should handle case insensitivity', () => {
      expect(generateHint('House')).toBe('A place to live');
      expect(generateHint('BOAT')).toBe('Floats on water');
    });

    it('should generate contextual hint with previous word', () => {
      const hint = generateHint('unknown', 'previous');
      expect(hint).toContain('previous');
    });

    it('should return length hint for unknown words', () => {
      const hint = generateHint('xyz');
      expect(hint).toContain('3 letters');
    });
  });

  describe('findValidNextWords', () => {
    it('should find valid next words', () => {
      const nextWords = findValidNextWords('Dog');
      expect(nextWords).toContain('House');
    });

    it('should return empty array for words with no valid next', () => {
      const nextWords = findValidNextWords('InvalidWord123');
      expect(nextWords).toEqual([]);
    });

    it('should handle case insensitivity', () => {
      const nextWords = findValidNextWords('dog');
      expect(nextWords.length).toBeGreaterThan(0);
    });
  });
});
