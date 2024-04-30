import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../../../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/items/$itemId/edit')({
  component: EditItemData
})

function EditItemData() {

  return (
    <AdminLayout
      title='Edit Collection Item'
      subtitle='Entity Data Management'
      showBack={true}>
        <></>
    </AdminLayout>
  );
}