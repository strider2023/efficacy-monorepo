import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import AppDataView from '../../../components/AppDataView';
import AdminChildLayout from '../../../layouts/AdminChildLayout';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/assets/$assetId/')({
  component: ViewAsset
})


function ViewAsset() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { assetId } = Route.useParams();
  const [formData, setFormData] = useState();

  useEffect(() => {
    axios.get(`${baseURL}/api/assets/${assetId}/metadata`,
      {
        headers: {
          Authorization: `${Cookies.get('efficacy_token')}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      })
  }, [assetId, baseURL]);

  const renderFilePreview = (formData: any) => {
    if (!formData) {
      return <p>No File Found</p>;
    }
    if (formData.mimetype.includes('image')) {
      return <img src={`${baseURL}/api/assets/${assetId}`} alt="Preview" />
    }
    if (formData.mimetype.includes('video')) {
      return (<video width="320" height="240" controls>
        <source src={`${baseURL}/api/assets/${assetId}`} type={formData.mimetype} />
        Your browser does not support the video tag.
      </video>);
    }
    return <p>No preview available for this file type.</p>;
  };

  return (
    <AdminChildLayout
      pageGroup='Asset Management'
      pageName='View Asset'>
      <>
        <AppDataView data={formData} />
        {renderFilePreview(formData)}
      </>
    </AdminChildLayout>
  );
}