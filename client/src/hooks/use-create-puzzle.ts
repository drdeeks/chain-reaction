import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCreatePuzzle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { difficulty: 'Easy' | 'Medium' | 'Hard'; chain: string[]; hints: string[]; createdBy?: string }) => {
      const res = await fetch(api.puzzles.create.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create puzzle');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.puzzles.list.path] });
    },
  });
}

export function useValidateChain() {
  return useMutation({
    mutationFn: async (chain: string[]) => {
      const res = await fetch(api.puzzles.validate.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chain }),
      });
      if (!res.ok) throw new Error('Validation failed');
      return res.json() as Promise<{ valid: boolean; invalidAt?: number }>;
    },
  });
}
