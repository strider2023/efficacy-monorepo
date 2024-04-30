import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import AppDataView from '../../../components/AppDataView';
import Cookies from 'js-cookie';
import AdminLayout from '../../../layouts/AdminLayout';

export const Route = createFileRoute('/assets/$assetId/')({
  component: ViewAsset,
  loader: async ({ params: { assetId } }) => {
    const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/assets/${assetId}/metadata`, config);
    return { formData: response.data };
  }
})


function ViewAsset() {
  const { assetId } = Route.useParams();
  const { formData } = Route.useLoaderData();

  const renderFilePreview = (formData: any) => {
    if (!formData) {
      return <p>No File Found</p>;
    }
    if (formData.mimetype.includes('image')) {
      return <img src={`${import.meta.env.VITE_BASE_URL}/api/assets/${assetId}`} alt="Preview" />
    }
    if (formData.mimetype.includes('video')) {
      return (<video width="320" height="240" controls>
        <source src={`${import.meta.env.VITE_BASE_URL}/api/assets/${assetId}`} type={formData.mimetype} />
        Your browser does not support the video tag.
      </video>);
    }
    return <p>No preview available for this file type.</p>;
  };

  return (
    <AdminLayout
      title='View Asset'
      subtitle='Asset Management'
      showBack={true}>
      <>
        <AppDataView data={formData} />
        {renderFilePreview(formData)}
      </>
    </AdminLayout>
  );
}