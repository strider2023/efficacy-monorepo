import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/collections/$collectionId/properties/$propertyId/edit')({
  component: () => <div>Hello /collections/$collectionId/properties/$propertyId/edit!</div>
})