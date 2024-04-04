import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { roleSchema, roleUISchema } from '../../../configurations';
import AdminChildLayout from '../../../layouts/AdminChildLayout';
import Notiflix from 'notiflix';

export const Route = createFileRoute('/roles/$roleId/')({
  component: ViewRole
})

function ViewRole() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { roleId } = Route.useParams();
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`${baseURL}/api/roles/${roleId}`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      })
  }, [roleId, cookies.efficacy_token]);

  const handleDelete = async () => {
    Notiflix.Confirm.show(
      'Delete Role',
      'Are you sure you want to delete this role?',
      'Yes',
      'No',
      function okCb() {
        axios.delete(`${baseURL}/api/roles/${roleId}`,
          {
            headers: {
              Authorization: `${cookies.efficacy_token}`,
            },
          }).then(() => {
            navigate({ to: '/roles' });
          })
      }
    );
  };

  const handleEdit = () => {
    navigate({ to: '/roles/' + roleId + '/edit' });
  }

  return (
    <AdminChildLayout
      pageGroup='Permissions Management'
      pageName='View Role'
      showDelete='Delete Role'
      showEdit='Edit Role'
      onDelete={handleDelete}
      onEdit={handleEdit}>
      <Box maxWidth="lg">
        <form>
          <JsonForms
            schema={roleSchema}
            uischema={roleUISchema}
            data={formData}
            renderers={materialRenderers}
            cells={materialCells}
            readonly
          />
        </form>
      </Box>
    </AdminChildLayout>
  );
}