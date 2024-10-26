import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/game/$gameId')({
  component: GamePage,
})

function GamePage() {
  const { gameId } = Route.useParams()
  
  return (
    <div>
      <h1>Game ID: {gameId}</h1>
    </div>
  )
}