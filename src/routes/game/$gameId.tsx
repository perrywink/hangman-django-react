import { getGame, makeGuess } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GameGuess } from "@/api/generated";

export const Route = createFileRoute("/game/$gameId")({
  component: GamePage,
});

const formSchema = z.object({
  guess: z
    .string()
    .max(1, { message: "Only 1 character is allowed"})
    .regex(/^[a-zA-Z]$/, "Must be a letter"),
});

function GamePage() {
  const { gameId } = Route.useParams();
  const queryClient = useQueryClient();

  const gameQuery = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(gameId),
  });

  const gameGuessMutate = useMutation({
    mutationFn: (guess: GameGuess) => makeGuess(gameId, guess),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guess: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    gameGuessMutate.mutate({
      guess: values.guess,
    });
  }

  if (gameQuery.isLoading) {
    return <div>Loading Game...</div>;
  }

  if (gameQuery.error) {
    return "An error has occurred: " + gameQuery.error.message;
  }

  if (!gameQuery.data) {
    return "Your game cannot be found";
  }

  return (
    <div className="mx-auto max-w-screen-sm flex flex-col">
      <div className="flex flex-col gap-4 border rounded p-6">
        {gameGuessMutate.error && (
          <div className="text-destructive">
            {gameGuessMutate.error.message}
          </div>
        )}
        <div>
          <h2 className="text-3xl font-semibold">{`Game #${gameQuery.data.id}`}</h2>
          <Badge>{gameQuery.data.status}</Badge>
        </div>
        <ul className="">
          <li>{`Guesses Left : ${gameQuery.data.incorrect_guesses_left}`}</li>
          <li>{`Guesses Made : ${gameQuery.data.incorrect_guesses_made}`}</li>
        </ul>
        <div className="text-background bg-foreground flex justify-center rounded">
          <h3 className="py-16 text-4xl tracking-widest">
            {gameQuery.data.word_state.toUpperCase()}
          </h3>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start gap-4 justify-end my-4"
          >
            <FormField
              control={form.control}
              name="guess"
              disabled={gameQuery.data.status != "InProgress"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guess a word!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={gameQuery.data.status != "InProgress"}
            >
              Guess
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
