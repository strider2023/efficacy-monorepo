import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/edit')({
  component: EditCollection
})

function EditCollection() {

  return (
    <AdminLayout
      title='Edit Collection'
      subtitle='Entity Management'
      showBack={true}>
        <></>
    </AdminLayout>
  );
}