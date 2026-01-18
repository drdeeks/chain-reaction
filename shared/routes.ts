import { z } from 'zod';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  puzzles: {
    list: {
      method: 'GET' as const,
      path: '/api/puzzles',
      responses: {
        200: z.array(z.object({
          id: z.number(),
          difficulty: z.string(),
          chain: z.array(z.string()),
          hints: z.array(z.string()),
          createdBy: z.string().nullable(),
          createdAt: z.date().nullable(),
        })),
        500: errorSchemas.internal,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/puzzles',
      body: z.object({
        difficulty: z.enum(['Easy', 'Medium', 'Hard']),
        chain: z.array(z.string().trim()).min(3).max(10),
        hints: z.array(z.string().trim()).min(1), // BUG FIX #38: At least one hint required
        createdBy: z.string().optional(),
      }),
      responses: {
        201: z.object({
          id: z.number(),
          difficulty: z.string(),
          chain: z.array(z.string()),
          hints: z.array(z.string()),
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
    validate: {
      method: 'POST' as const,
      path: '/api/puzzles/validate',
      body: z.object({
        chain: z.array(z.string()).min(2),
      }),
      responses: {
        200: z.object({
          valid: z.boolean(),
          invalidAt: z.number().optional(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
  leaderboard: {
    list: {
      method: 'GET' as const,
      path: '/api/leaderboard/:puzzleId',
      responses: {
        200: z.array(z.object({
          id: z.number(),
          playerName: z.string(),
          puzzleId: z.number(),
          completionTime: z.number(),
          hintsUsed: z.number(),
          score: z.number(),
          createdAt: z.date().nullable(),
        })),
        500: errorSchemas.internal,
      },
    },
    submit: {
      method: 'POST' as const,
      path: '/api/leaderboard',
      body: z.object({
        playerName: z.string().min(1).max(50).transform(s => s.trim().replace(/[<>]/g, '')),
        puzzleId: z.number().positive(),
        completionTime: z.number().min(1),
        hintsUsed: z.number().min(0),
      }),
      responses: {
        201: z.object({
          id: z.number(),
          score: z.number(),
          rank: z.number(),
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  share: {
    generate: {
      method: 'POST' as const,
      path: '/api/share',
      body: z.object({
        puzzleId: z.number(),
        completionTime: z.number(),
        hintsUsed: z.number(),
      }),
      responses: {
        200: z.object({
          shareUrl: z.string(),
          shareText: z.string(),
        }),
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      const placeholder = `:${key}`;
      if (url.includes(placeholder)) {
        url = url.replace(placeholder, String(value));
      }
    });
    
    // BUG FIX #29: Check if any placeholders remain
    if (url.includes(':')) {
      throw new Error(`Missing required URL parameter in: ${url}`);
    }
  }
  return url;
}
