import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <IndexPage />,
})

export function IndexPage () {
  return (
    <div>
      <Button>New Game</Button>
    </div>
  );
}
