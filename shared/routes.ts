import { z } from 'zod';
import { insertPuzzleSchema, puzzles } from './schema';

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
        200: z.array(z.custom<typeof puzzles.$inferSelect>()),
      },
    },
    // We can add a create endpoint if we want to add puzzles dynamically later, but for now we seed them.
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PuzzleResponse = z.infer<typeof api.puzzles.list.responses[200]>[number];
