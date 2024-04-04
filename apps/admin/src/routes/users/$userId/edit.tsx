import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId/edit')({
  component: () => <div>Hello /users/$userId/edit!</div>
})