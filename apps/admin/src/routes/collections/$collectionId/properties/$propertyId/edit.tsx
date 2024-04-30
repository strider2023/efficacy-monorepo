import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../../../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/properties/$propertyId/edit')({
  component: EditCollectionProperty
})

function EditCollectionProperty() {

  return (
    <AdminLayout
      title='Edit Collection Property'
      subtitle='Entity Management'
      showBack={true}>
        <></>
    </AdminLayout>
  );
}