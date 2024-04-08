import { Box, Fab, Typography } from '@mui/material';
import { GridCallbackDetails, DataGrid, GridToolbar, GridPaginationModel, GridActionsCellItem } from '@mui/x-data-grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { getProccessedString } from '@efficacy/ui-utilities';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Route = createFileRoute('/roles/')({
  component: RolesList,
  validateSearch: (search: Record<string, unknown>): Record<string, unknown> => {
    // validate and parse the search params into a typed state
    console.log(search);
    return {
      offset: Number(search?.offset ?? 0),
      limit: Number(search?.offset ?? 50),
    }
  },
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  loader: async ({ deps: { offset, limit } }) => {
    const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
    const [response1, reponse2] = await Promise.all([
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/roles/schema`, config),
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/roles?limit=${limit}&offset=${offset}&showCount=true`, config)
    ]);
    return { pageConfig: response1.data, rows: reponse2.data };
  }
})

function RolesList() {
  const navigate = useNavigate();
  const { offset, limit } = Route.useSearch()
  const { pageConfig, rows } = Route.useLoaderData();

  const deleteItem = useCallback(
    (params: any) => () => {
      console.log('delete called', params)
    },
    [],
  );

  const editItem = useCallback(
    (params: any) => () => {
      navigate({ to: getProccessedString(pageConfig.editURL, params.row) });
    },
    [],
  );

  const setPaginationModel = (model: GridPaginationModel, details: GridCallbackDetails<any>): void => {
    navigate({
      search: () => ({ offset: model.page, limit: model.pageSize }),
    })
  }

  const extractValuesInCurlyBraces = (inputString: string) => {
    const regex = /{([^}]+)}/g;
    const matches = inputString.match(regex);
    if (matches) {
      return matches.map(match => match.slice(1, -1));
    } else {
      return [];
    }
  }

  const replaceValuesInCurlyBraces = (inputString: string, valueMap: Record<string, string>) => {
    return inputString.replace(/\{([^}]+)\}/g, function (match, key) {
      return valueMap[key.trim()] || match;
    });
  }


  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, ml: 1 }}>
            <Typography variant="h5" >
              {pageConfig.title}
            </Typography>
            {
              pageConfig.subtitle &&
              <Typography variant="overline" gutterBottom>
                {pageConfig.subtitle}
              </Typography>
            }
          </Box>
          <Box>
            {
              pageConfig.showFilter &&
              <Fab color="primary" aria-label="add" variant="extended" sx={{ m: 1 }}>
                <i className="ti ti-adjustments menu-item-icon"></i>
                Filter
              </Fab>
            }
            <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={() => navigate({ to: pageConfig.addURL })}>
              <i className="ti ti-plus menu-item-icon"></i>
            </Fab>
          </Box>
        </Box>
        <Box sx={{ p: 3, width: '100%' }}>
          <DataGrid
            autoHeight
            rows={rows.result}
            columns={[...pageConfig.properties, {
              field: 'actions',
              type: 'actions',
              flex: 1, align: 'center', headerAlign: 'center',
              getActions: (params: any) => [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  onClick={editItem(params)}
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={deleteItem(params)}
                />,
              ],
            }]}
            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
            rowCount={Number(rows.count[0].count ?? 0)}
            paginationModel={{
              pageSize: Number(offset ?? 50),
              page: Number(limit ?? 0),
            }}
            onPaginationModelChange={setPaginationModel}
            paginationMode="server"
            pageSizeOptions={[50, 75, 100]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </Box>
    </AdminLayout>
  )
}