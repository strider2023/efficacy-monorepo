import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assets/$assetId/')({
  component: () => <div>Hello /assets/$assetId/!</div>
})