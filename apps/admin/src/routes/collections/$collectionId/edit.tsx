import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collections/$collectionId/edit')({
  component: () => <div>Hello /collections/$collectionId/edit!</div>
})