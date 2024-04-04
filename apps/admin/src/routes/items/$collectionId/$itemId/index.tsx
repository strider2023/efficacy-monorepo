import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/items/$collectionId/$itemId/')({
  component: () => <div>Hello /items/$collectionId/$itemId/!</div>
})