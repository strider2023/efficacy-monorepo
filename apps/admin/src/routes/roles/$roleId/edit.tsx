import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, useEffect, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { updateRoleSchema, updateRoleUISchema } from '../../../configurations';
import AdminChildLayout from '../../../layouts/AdminChildLayout';

export const Route = createFileRoute('/roles/$roleId/edit')({
  component: EditRole
})

function EditRole() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { roleId } = Route.useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({});
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/roles/${roleId}`,
      {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      }).then((resp) => {
        const formData = resp.data;
        delete formData.id;
        delete formData.roleId;
        delete formData.status;
        setFormData(resp.data);
      })
  }, [roleId, cookies.efficacy_token]);

  const handleSave = async () => {
    if (errorData.length == 0) {
      await axios.put(`${baseURL}/api/roles/${roleId}`, formData, {
        headers: {
          Authorization: `${cookies.efficacy_token}`,
        },
      });
      navigate({ to: '/roles/' });
    } else {
      Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
    }
  };

  const handleOnChange = async (data: SetStateAction<{}>, error) => {
    setFormData(data);
    setErrorData(error);
  }

  return (
    <AdminChildLayout
      pageGroup='Permissions Management'
      pageName='Update Role'
      showSave='Update Role'
      onSave={handleSave}>
      <Box maxWidth="lg">
        <form onSubmit={handleSave}>
          <JsonForms
            schema={updateRoleSchema}
            uischema={updateRoleUISchema}
            data={formData}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, errors }) => handleOnChange(data, errors)}
          />
        </form>
      </Box>
    </AdminChildLayout>
  );
}