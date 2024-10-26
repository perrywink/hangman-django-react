import { Game } from "@/api/generated";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "@tanstack/react-router";

interface IGamesTableProps {
  games: Game[] | undefined;
}

export function GamesTable({ games }: IGamesTableProps) {
  const router = useRouter();

  if (!games) {
    return "No games yet.";
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="pointer-events-none">
          <TableHead className="w-[100px]">Game</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Word State</TableHead>
          <TableHead>Guesses Left</TableHead>
          <TableHead>Guesses Made</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow
            key={game.id}
            onClick={() => router.navigate({ to: `/game/${game.id}` })}
            className="cursor-pointer"
          >
            <TableCell className="font-medium">{game.id}</TableCell>
            <TableCell>{game.status}</TableCell>
            <TableCell>{game.word_state}</TableCell>
            <TableCell>{game.incorrect_guesses_left}</TableCell>
            <TableCell>{game.incorrect_guesses_made}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
