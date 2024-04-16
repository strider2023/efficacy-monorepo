import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { collectionPropertySchema, collectionPropertyUISchema } from '../../../../../configurations';
import AdminLayout from '../../../../../layouts/AdminLayout';

export const Route = createFileRoute('/collections/$collectionId/properties/$propertyId/')({
  component: ViewProperty
})

function ViewProperty() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { collectionId, propertyId } = Route.useParams();
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(baseURL + `/api/collection/${collectionId}/property/${propertyId}`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      })
  }, [collectionId, cookies.efficacy_token]);

  const handleDelete = async () => {
    Notiflix.Confirm.show(
      'Delete Collection',
      'Are you sure you want to delete this collection?',
      'Yes',
      'No',
      function okCb() {
        axios.delete(`${baseURL}/api/collection/${collectionId}/property/${propertyId}`,
          {
            headers: {
              Authorization: `${cookies.efficacy_token}`,
            },
          }).then(() => {
            navigate({ to: '/collections/${collectionId}' });
          })
      }
    );
  };

  const handleEdit = () => {
    navigate({ to: '/collections/' + collectionId + '/property/' + propertyId + '/edit' });
  }

  return (
    <AdminLayout
      title='View Collection Property'
      subtitle='Entity Management'
      showBack={true}>
      <>
        <Box maxWidth="lg">
          <form>
            <JsonForms
              schema={collectionPropertySchema}
              uischema={collectionPropertyUISchema}
              data={formData}
              renderers={materialRenderers}
              cells={materialCells}
              readonly
            />
          </form>
        </Box>
      </>
    </AdminLayout>
  );
}