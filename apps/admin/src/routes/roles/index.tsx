import { Box } from '@mui/material';
import { GridColDef, GridRowParams, MuiEvent, GridCallbackDetails, GridValueGetterParams } from '@mui/x-data-grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from '../../components/ListHeader';
import TableComponent from '../../components/TableComponent';
import AdminLayout from '../../layouts/AdminLayout';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded';

export const Route = createFileRoute('/roles/')({
  component: RolesList
})

function RolesList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [cookies] = useCookies(["efficacy_token"]);
  const [rows, setRows] = useState([]);
  const columns: GridColDef[] = [
    { field: 'roleId', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'displayName', headerName: 'Display Name', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'adminAccess', headerName: 'Admin Access', flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        if (params.row.status === 'active') {
          return <CheckCircleRoundedIcon color="primary" />;
        } else {
          return <DoDisturbOnRoundedIcon sx={{ color: 'red' }} />;
        }
      }
    },
    {
      field: 'portalAccess', headerName: 'Portal Access', flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        if (params.row.status === 'active') {
          return <CheckCircleRoundedIcon color="primary" />;
        } else {
          return <DoDisturbOnRoundedIcon sx={{ color: 'red' }} />;
        }
      }
    },
    {
      field: 'appAccess', headerName: 'App Access', flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        if (params.row.status === 'active') {
          return <CheckCircleRoundedIcon color="primary" />;
        } else {
          return <DoDisturbOnRoundedIcon sx={{ color: 'red' }} />;
        }
      }
    },
  ];

  useEffect(() => {
    axios.get(baseURL + '/api/roles',
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
    navigate({ from: '/roles/', to: '/roles/' + params.row.roleId });
  };

  const onCreateClicked = () => {
    navigate({from: '/roles', to: '/roles/create' })
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <ListHeader
          pageGroup='Permissions Management'
          pageName='Roles'
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