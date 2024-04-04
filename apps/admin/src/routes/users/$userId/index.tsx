import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId/')({
  component: () => <div>Hello /users/$userId/!</div>
})