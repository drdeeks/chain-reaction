import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useLeaderboard(puzzleId: number) {
  return useQuery({
    queryKey: ['leaderboard', puzzleId],
    queryFn: async () => {
      const url = buildUrl(api.leaderboard.list.path, { puzzleId });
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      return res.json();
    },
    enabled: !!puzzleId && puzzleId > 0,
  });
}

export function useSubmitScore() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { playerName: string; puzzleId: number; completionTime: number; hintsUsed: number }) => {
      const res = await fetch(api.leaderboard.submit.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to submit score');
      }
      return res.json() as Promise<{ id: number; score: number; rank: number }>;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard', variables.puzzleId] });
    },
  });
}

export function useGenerateShare() {
  return useMutation({
    mutationFn: async (data: { puzzleId: number; completionTime: number; hintsUsed: number }) => {
      const res = await fetch(api.share.generate.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to generate share link');
      return res.json() as Promise<{ shareUrl: string; shareText: string }>;
    },
  });
}
