import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import AppDataView from '../../../../../components/AppDataView';
import AdminLayout from '../../../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/items/$itemId/')({
  component: ViewCollectionItem
})

function ViewCollectionItem() {
  const { collectionId, itemId } = Route.useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/collection/${collectionId}/item/${itemId}`,
      {
        headers: {
          Authorization: `${Cookies.get('efficacy_token')}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      });
  }, [collectionId, itemId]);


  return (
    <AdminLayout
      subtitle='Entity Data Management'
      title='View Collection Item'
      showBack={true}>
      <>
        <AppDataView data={formData} />
      </>
    </AdminLayout>
  );
}