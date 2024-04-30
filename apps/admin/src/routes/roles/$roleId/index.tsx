import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import AppDataView from '../../../components/AppDataView';
import Cookies from 'js-cookie';
import AdminLayout from '../../../layouts/AdminLayout';

export const Route = createFileRoute('/roles/$roleId/')({
  component: ViewRole,
  loader: async ({ params: { roleId } }) => {
    const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/roles/${roleId}`, config);
    return { formData: response.data };
  }
})

function ViewRole() {
  const { formData } = Route.useLoaderData();

  return (
    <AdminLayout
      title='Create Role'
      subtitle='Permissions Management'
      showBack={true}>
      <AppDataView data={formData} />
    </AdminLayout>
  );
}