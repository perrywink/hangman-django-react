import { getGame } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/$gameId")({
  component: GamePage,
});

function GamePage() {
  const { gameId } = Route.useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: [`/game/${gameId}`],
    queryFn: () => getGame(gameId),
  });

  if (isLoading) {
    return <div>Loading Game...</div>;
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  if (!data) {
    return "Your game cannot be found";
  }

  return (
    <div className="mx-auto max-w-screen-sm flex flex-col">
      <div className="flex flex-col gap-4 border rounded p-6">
        <div>
          <h2 className="text-3xl font-semibold">{`Game #${data.id}`}</h2>
          <Badge>{data.status}</Badge>
        </div>
        <ul className="">
          <li>{`Guesses Left : ${data.incorrect_guesses_left}`}</li>
          <li>{`Guesses Made : ${data.incorrect_guesses_made}`}</li>
        </ul>
        <div className="text-background bg-foreground flex justify-center rounded">
          <h3 className="py-16 text-4xl tracking-widest">{data.word_state}</h3>
        </div>
        <div className="flex items-center gap-4 justify-end my-4">
          <Input className="max-w-40" placeholder="1 word guess here!" />
          <Button>
            Guess
          </Button>
        </div>
      </div>
    </div>
  );
}
