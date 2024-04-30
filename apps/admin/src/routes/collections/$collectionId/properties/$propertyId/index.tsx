import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import AdminLayout from '../../../../../layouts/AdminLayout';
import AppDataView from '../../../../../components/AppDataView';

export const Route = createFileRoute('/collections/$collectionId/properties/$propertyId/')({
  component: ViewProperty
})

function ViewProperty() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { collectionId, propertyId } = Route.useParams();
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(baseURL + `/api/collection/${collectionId}/property/${propertyId}`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      })
  }, [baseURL, collectionId, cookies.efficacy_token, propertyId]);

  return (
    <AdminLayout
      subtitle='View Collection Property'
      title='View Collection'
      showBack={true}>
      <>
        <AppDataView data={formData} />
      </>
    </AdminLayout>
  );
}