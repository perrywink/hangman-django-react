import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { newGame } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

export function IndexPage() {
  const router = useRouter();
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
        <Button
          size="lg"
          className="text-xl"
          onClick={() => mutateNewGame.mutate()}
        >
          {mutateNewGame.isPending ? "Loading..." : "New Game"}
        </Button>
      </div>
    </div>
  );
}
