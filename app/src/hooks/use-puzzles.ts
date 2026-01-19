import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function usePuzzles() {
  return useQuery({
    queryKey: [api.puzzles.list.path],
    queryFn: async () => {
      const res = await fetch(api.puzzles.list.path);
      if (!res.ok) throw new Error("Failed to fetch puzzles");
      return api.puzzles.list.responses[200].parse(await res.json());
    },
  });
}
