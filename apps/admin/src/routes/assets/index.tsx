import { Box } from '@mui/material';
import { GridColDef, GridValueGetterParams, GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from '../../components/ListHeader';
import TableComponent from '../../components/TableComponent';
import AdminLayout from '../../layouts/AdminLayout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

export const Route = createFileRoute('/assets/')({
  component: AssetsList
})

function AssetsList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [cookies] = useCookies(["efficacy_token"]);
  const [rows, setRows] = useState([]);
  const columns: GridColDef[] = [
    { field: 'assetId', headerName: 'Asset Id', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'mimetype', headerName: 'Type', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'filename', headerName: 'File Name', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1, align: 'center', headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        if (params.row.status === 'active') {
          return <CheckCircleIcon color="primary" />;
        } else {
          return <HighlightOffIcon />;
        }
      },
    },
  ];

  useEffect(() => {
    axios.get(baseURL + '/api/assets',
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
    navigate({ from: '/assets', to: '/assets/' + params.row.assetId });
  };

  const onCreateClicked = () => {
    navigate({from: '/assets', to: '/assets/create' })
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <ListHeader
          subtitle='Asset Management'
          title='Assets'
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