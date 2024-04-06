import { Box } from '@mui/material';
import { GridColDef, GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import ListHeader from '../../components/ListHeader';
import TableComponent from '../../components/TableComponent';
import AdminLayout from '../../layouts/AdminLayout';

import Cookies from 'js-cookie';

export const Route = createFileRoute('/roles/')({
  component: RolesList, 
  loader: async () => {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + '/api/roles',
    {
      headers: {
        Authorization: `${Cookies.get('efficacy_token')}`,
      },
    });
    return response.data.result;
  }
})

function RolesList() {
  const navigate = useNavigate();
  const rows = Route.useLoaderData();
  const columns: GridColDef[] = [
    { field: 'roleId', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'displayName', headerName: 'Display Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'adminAccess', headerName: 'Admin Access', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'portalAccess', headerName: 'Portal Access', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'appAccess', headerName: 'App Access', flex: 1, align: 'center', headerAlign: 'center' },
  ];

  const gridRowClick = (
    params: GridRowParams,
    event: MuiEvent,
    details: GridCallbackDetails) => {
    navigate({ from: '/roles/', to: '/roles/' + params.row.roleId });
  };

  const onCreateClicked = () => {
    navigate({ from: '/roles', to: '/roles/create' })
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <ListHeader
          subtitle='Permissions Management'
          title='Roles'
          navigateTo={onCreateClicked} />
        <TableComponent
          gridRowClick={gridRowClick}
          columns={columns}
          rows={rows}
        />
      </Box>
    </AdminLayout>
  )
}