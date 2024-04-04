import { Box } from '@mui/material';
import { GridColDef, GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ListHeader from '../../../../components/ListHeader';
import TableComponent from '../../../../components/TableComponent';
import AdminLayout from '../../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/properties/')({
  component: CollectionsPropertiesList
})

function CollectionsPropertiesList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { collectionId } = Route.useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["efficacy_token"]);
  const [rows, setRows] = useState([]);
  const columns: GridColDef[] = [
    { field: 'propertyName', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'displayName', headerName: 'Collection Id', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'type', headerName: 'Schema Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'nullable', headerName: 'Table Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'isUnique', headerName: 'Table Name', flex: 1, align: 'center', headerAlign: 'center' },
  ];

  useEffect(() => {
    axios.get(baseURL + `/api/collection/${collectionId}/property`,
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
    navigate({ from: '/collections/', to: '/collections/' + params.row.collectionId + '/properties' });
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 1, width: '100%' }}>
        <ListHeader
          pageGroup='Entity Management'
          pageName='Collection Properties'
          createURL={`/collections/${collectionId}/properties/create`} />
        <TableComponent
          gridRowClick={gridRowClick}
          columns={columns}
          rows={rows}
        />
      </Box>
    </AdminLayout>
  )
}