import Fab from '@mui/material/Fab';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box } from '@mui/material';
import AdminLayout from '../../../../layouts/AdminLayout';
import Cookies from 'js-cookie';
import axios from 'axios';
import AppTable from '../../../../components/AppTable';

export const Route = createFileRoute('/collections/$collectionId/items/')({
  component: ItemDataList,
  validateSearch: (search: Record<string, unknown>): Record<string, unknown> => {
    return {
      offset: Number(search?.offset ?? 0),
      limit: Number(search?.offset ?? 50),
    }
  },
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  loader: async ({ deps: { offset, limit }, params: { collectionId } }) => {
    const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
    const [response1, reponse2] = await Promise.all([
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/template/${collectionId}/dynamic-table`, config),
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/collection/${collectionId}/items?limit=${limit}&offset=${offset}&showCount=true`, config)
    ]);
    return { pageConfig: response1.data, rows: reponse2.data };
  }
})

function ItemDataList() {
  const { offset, limit } = Route.useSearch()
  const { pageConfig, rows } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <AdminLayout
      title={pageConfig.title}
      subtitle={pageConfig.subtitle}
      showBack={true}
      menuItem={
        <Box>
          {
            pageConfig.showFilter &&
            <Fab color="primary" aria-label="add" variant="extended" sx={{ m: 1 }}>
              <i className="ti ti-adjustments menu-item-icon"></i>
              Filter
            </Fab>
          }
          {
            pageConfig.addURL &&
            <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={() => navigate({ to: pageConfig.addURL })}>
              <i className="ti ti-plus menu-item-icon"></i>
            </Fab>
          }
        </Box>
      }>
      <AppTable offset={offset} limit={limit} pageConfig={pageConfig} rows={rows} />
    </AdminLayout>
  )
}