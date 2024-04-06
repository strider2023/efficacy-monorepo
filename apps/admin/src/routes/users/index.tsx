import { Box } from '@mui/material';
import { GridColDef, GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from '../../components/ListHeader';
import TableComponent from '../../components/TableComponent';
import AdminLayout from '../../layouts/AdminLayout';

export const Route = createFileRoute('/users/')({
  component: UsersList
})

function UsersList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [cookies] = useCookies(["efficacy_token"]);
  const [rows, setRows] = useState([]);
  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'First Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'lastname', headerName: 'Last Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: 'email', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'phone', headerName: 'Phone', flex: 1, align: 'center', headerAlign: 'center' }
  ];

  useEffect(() => {
    axios.get(baseURL + '/api/user',
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setRows(resp.data.result);
      })
  }, [cookies.efficacy_token]);

  const gridRowClick = (
    params: GridRowParams,
    event: MuiEvent,
    details: GridCallbackDetails) => {
    navigate({ from: '/users/', to: '/users/' + params.row.userId });
  };

  const onCreateClicked = () => {
    navigate({from: '/users', to: '/users/create' })
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <ListHeader
          subtitle='User Management'
          title='Users'
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