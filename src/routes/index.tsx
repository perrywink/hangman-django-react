import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getGames, newGame } from "@/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GamesTable } from "@/components/games-table";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

export function IndexPage() {
  const router = useRouter();
  const listGame = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const mutateNewGame = useMutation({
    mutationFn: newGame,
    onSuccess: (data) => {
      router.navigate({
        to: "/game/$gameId",
        params: { gameId: data.id.toString() },
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Recent Games</h2>
        <Button onClick={() => mutateNewGame.mutate()}>
          {mutateNewGame.isPending ? "Loading..." : "New Game"}
        </Button>
      </div>
      <div className="border rounded">
        <GamesTable games={listGame.data} />
      </div>
    </div>
  );
}
