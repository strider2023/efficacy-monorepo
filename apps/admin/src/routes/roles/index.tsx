import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Cookies from 'js-cookie';
import AppTable from '../../components/AppTable';

export const Route = createFileRoute('/roles/')({
  component: RolesList,
  validateSearch: (search: Record<string, unknown>): Record<string, unknown> => {
    return {
      offset: Number(search?.offset ?? 0),
      limit: Number(search?.offset ?? 50),
    }
  },
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  loader: async ({ deps: { offset, limit } }) => {
    const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
    const [response1, reponse2] = await Promise.all([
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/template/roles/table`, config),
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/roles?limit=${limit}&offset=${offset}&showCount=true`, config)
    ]);
    return { pageConfig: response1.data, rows: reponse2.data };
  }
})

function RolesList() {
  const { offset, limit } = Route.useSearch()
  const { pageConfig, rows } = Route.useLoaderData();

  return (
    <AdminLayout>
      <AppTable offset={offset} limit={limit} pageConfig={pageConfig} rows={rows} />
    </AdminLayout>
  )
}