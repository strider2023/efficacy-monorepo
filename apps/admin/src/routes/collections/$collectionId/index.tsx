import { Box, Fab } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
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

  useEffect(() => {
    axios.get(`${baseURL}/api/collection/${collectionId}`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      });
  }, [baseURL, collectionId, cookies.efficacy_token]);


  return (
    <AdminLayout
      subtitle='Entity Management'
      title='View Collection'
      showBack={true}
      menuItem={
        <Box>
          <Fab
            color="primary"
            aria-label="add"
            variant="extended"
            sx={{ m: 1 }}
            onClick={() => navigate({ to: '/collections/' + collectionId + '/items' })}>
            <i className="ti ti-list-details menu-item-icon"></i>
            View Data
          </Fab>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ m: 1 }}
            onClick={() => navigate({ to: '/collections/' + collectionId + '/properties' })}>
            <i className="ti ti-settings-bolt menu-item-icon"></i>
          </Fab>
        </Box>
      }>
      <>
        <AppDataView data={formData} />
      </>
    </AdminLayout>
  );
}