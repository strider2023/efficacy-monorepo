import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assets/create')({
  component: () => <div>Hello /assets/create!</div>
})