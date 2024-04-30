import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collections/$collectionId/items/$itemId/edit')({
  component: () => <div>Hello /collections/$collectionId/items/$itemId/edit!</div>
})