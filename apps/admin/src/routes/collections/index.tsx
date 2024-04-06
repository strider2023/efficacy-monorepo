import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AdminLayout from '../../layouts/AdminLayout'
import { Box } from '@mui/material'
import ListHeader from '../../components/ListHeader'
import TableComponent from '../../components/TableComponent'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { GridRowParams, MuiEvent, GridCallbackDetails, GridValueGetterParams, GridColDef } from '@mui/x-data-grid'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import axios from 'axios'

export const Route = createFileRoute('/collections/')({
  component: CollectionsList
})

function CollectionsList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [cookies] = useCookies(["efficacy_token"]);
  const [rows, setRows] = useState([]);
  const columns: GridColDef[] = [
    { field: 'displayName', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'collectionId', headerName: 'Collection Id', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'schemaName', headerName: 'Schema Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'tableName', headerName: 'Table Name', flex: 1, align: 'center', headerAlign: 'center' },
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
    axios.get(baseURL + '/api/collection?properties=id&properties=collectionId&properties=displayName&properties=description&properties=schemaName&properties=tableName&&properties=status',
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
    navigate({ from: '/collections/', to: '/collections/' + params.row.collectionId });
  };

  const onCreateClicked = () => {
    navigate({from: '/collections', to: '/collections/create' })
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <ListHeader
          subtitle='Entity Management'
          title='Collections'
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