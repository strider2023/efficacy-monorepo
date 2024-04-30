import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../../../layouts/AdminLayout';

export const Route = createFileRoute('/assets/$assetId/edit')({
  component: EditAsset
})

function EditAsset() {

  return (
    <AdminLayout
      title='Edit Asset'
      subtitle='Asset Management'
      showBack={true}>
        <></>
    </AdminLayout>
  );
}