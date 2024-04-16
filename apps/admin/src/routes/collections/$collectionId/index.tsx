import { Drawer, Fab } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { GridRowParams, MuiEvent, GridCallbackDetails, GridColDef } from '@mui/x-data-grid';
import ListHeader from '../../../components/AppHeader';
import TableComponent from '../../../components/TableComponent';
import AddIcon from '@mui/icons-material/Add';
import AppDataView from '../../../components/AppDataView';
import AdminLayout from '../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/')({
  component: ViewCollection
})

function ViewCollection() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { collectionId } = Route.useParams();
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({});
  const [editOpen, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const columns: GridColDef[] = [
    { field: 'propertyName', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'displayName', headerName: 'Collection Id', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'type', headerName: 'Schema Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'nullable', headerName: 'Table Name', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'isUnique', headerName: 'Table Name', flex: 1, align: 'center', headerAlign: 'center' },
  ];

  useEffect(() => {
    axios.get(`${baseURL}/api/collection/${collectionId}`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      });

    axios.get(baseURL + `/api/collection/${collectionId}/property`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setRows(resp.data.result);
      })
  }, [baseURL, collectionId, cookies.efficacy_token]);

  const handleDelete = async () => {
    Notiflix.Confirm.show(
      'Delete Collection',
      'Are you sure you want to delete this collection?',
      'Yes',
      'No',
      function okCb() {
        axios.delete(`${baseURL}/api/collection/${collectionId}`,
          {
            headers: {
              Authorization: `${cookies.efficacy_token}`,
            },
          }).then(() => {
            navigate({ to: '/collections' });
          })
      }
    );
  };

  const handleEdit = () => {
    navigate({ to: '/collections/' + collectionId + '/edit' });
  }

  const gridRowClick = (
    params: GridRowParams,
    event: MuiEvent,
    details: GridCallbackDetails) => {
    navigate({
      from: '/collections/' + collectionId,
      to: '/collections/' + collectionId + '/properties/' + params.row.propertyName
    });
  };

  const onCreateClicked = () => {
    setOpen(true);
    // navigate({ to: `/collections/${collectionId}/properties/create` });
    //`/collections/${collectionId}/properties/create`
  }

  return (
    <AdminLayout
      subtitle='Entity Management'
      title='View Collection'
      showBack={true}>
      <>
        <AppDataView data={formData} />
        {/* <div className="base-container">
          <ListHeader
            subtitle='Entity Management'
            title='Collection Properties'
            navigateTo={onCreateClicked} />
          <TableComponent
            gridRowClick={gridRowClick}
            columns={columns}
            rows={rows}
          />
        </div> */}
        <Drawer
          variant='persistent'
          anchor='right'
          open={editOpen}
          sx={{ backgroundColor: 'transparent' }}>
          <div className="base-drawer-container">
            <Fab size="small" color="primary" aria-label="add" sx={{ margin: 3 }} onClick={() => setOpen(false)}>
              <AddIcon />
            </Fab>
            <div className='base-drawer-form-container'>

            </div>
          </div>
        </Drawer>
      </>
    </AdminLayout>
  );
}