import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCreatePuzzle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { difficulty: 'Easy' | 'Medium' | 'Hard'; chain: string[]; hints: string[]; createdBy?: string }) => {
      // Validate hints array matches hidden words count
      const hiddenWordsCount = data.chain.length - 2; // Exclude first and last
      if (data.hints.length !== hiddenWordsCount) {
        throw new Error(`Hints count (${data.hints.length}) must match hidden words count (${hiddenWordsCount})`);
      }
      
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
      // Validate chain has at least 2 words
      if (!chain || chain.length < 2) {
        throw new Error('Chain must have at least 2 words');
      }
      
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
