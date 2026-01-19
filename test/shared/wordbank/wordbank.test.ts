import { describe, it, expect } from 'vitest';
import { isValidWord, getRandomWords, PAINT_COLORS } from '../../../shared/wordbank';

describe('wordbank', () => {
  describe('PAINT_COLORS', () => {
    it('should have at least 100 colors', () => {
      expect(PAINT_COLORS.length).toBeGreaterThan(100);
    });

    it('should contain known paint colors', () => {
      expect(PAINT_COLORS).toContain('Storm');
      expect(PAINT_COLORS).toContain('Lightning');
      expect(PAINT_COLORS).toContain('Fire');
      expect(PAINT_COLORS).toContain('Side');
    });

    it('should not have undefined or null values', () => {
      PAINT_COLORS.forEach(color => {
        expect(color).toBeDefined();
        expect(color).not.toBeNull();
        expect(typeof color).toBe('string');
      });
    });
  });

  describe('isValidWord', () => {
    it('should validate words in the bank', () => {
      expect(isValidWord('Storm')).toBe(true);
      expect(isValidWord('Fire')).toBe(true);
      expect(isValidWord('Side')).toBe(true);
    });

    it('should handle case insensitivity', () => {
      expect(isValidWord('storm')).toBe(true);
      expect(isValidWord('STORM')).toBe(true);
      expect(isValidWord('StOrM')).toBe(true);
    });

    it('should reject invalid words', () => {
      expect(isValidWord('InvalidWord123')).toBe(false);
      expect(isValidWord('NotInBank')).toBe(false);
    });

    it('should reject empty strings', () => {
      expect(isValidWord('')).toBe(false);
    });
  });

  describe('getRandomWords', () => {
    it('should return requested number of words', () => {
      const words = getRandomWords(5);
      expect(words).toHaveLength(5);
    });

    it('should return unique words', () => {
      const words = getRandomWords(10);
      const uniqueWords = new Set(words);
      expect(uniqueWords.size).toBe(10);
    });

    it('should return valid words from bank', () => {
      const words = getRandomWords(5);
      words.forEach(word => {
        expect(PAINT_COLORS).toContain(word);
      });
    });

    it('should handle edge case of 0 words', () => {
      const words = getRandomWords(0);
      expect(words).toHaveLength(0);
    });
  });
});
