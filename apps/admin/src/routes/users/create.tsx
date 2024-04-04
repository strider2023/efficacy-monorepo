import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/create')({
  component: () => <div>Hello /users/create!</div>
})