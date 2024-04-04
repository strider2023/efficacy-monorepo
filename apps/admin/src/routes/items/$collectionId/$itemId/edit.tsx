import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/items/$collectionId/$itemId/edit')({
  component: () => <div>Hello /items/$collectionId/$itemId/edit!</div>
})