import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assets/$assetId/edit')({
  component: () => <div>Hello /assets/$assetId/edit!</div>
})