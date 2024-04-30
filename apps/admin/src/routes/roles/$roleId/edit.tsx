import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box, Fab } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, SetStateAction } from 'react';
import { updateRoleSchema, updateRoleUISchema } from '../../../configurations';
import AdminLayout from '../../../layouts/AdminLayout';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/roles/$roleId/edit')({
  component: EditRole,
  loader: async ({ params: { roleId } }) => {
    const config = { headers: { Authorization: `${Cookies.get('efficacy_token')}`, } };
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/roles/${roleId}`, config);
    const formData = response.data;
    delete formData.id;
    delete formData.roleId;
    delete formData.status;
    return { data: formData };
  }
})

function EditRole() {
  const { roleId } = Route.useParams();
  const { data } = Route.useLoaderData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(data);
  const [errorData, setErrorData] = useState([]);

  const handleSave = async () => {
    if (errorData.length > 0) {
      Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
    }
    await axios.put(`${import.meta.env.VITE_BASE_URL}/api/roles/${roleId}`, formData, {
      headers: {
        Authorization: `${Cookies.get('efficacy_token')}`,
      },
    });
    Notiflix.Notify.success('Data updated successfully.', undefined, { position: 'right-bottom' });
    navigate({ to: '/roles/' });
  };

  const handleOnChange = async (data: SetStateAction<{}>, error) => {
    setFormData(data);
    setErrorData(error);
  }

  return (
    <AdminLayout
      title='Create Role'
      subtitle='Permissions Management'
      showBack={true}
      menuItem={
        <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={handleSave}>
          <i className="ti ti-device-floppy menu-item-icon"></i>
        </Fab>
      }>
      <Box maxWidth="lg" sx={{ m: 2 }}>
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
    </AdminLayout>
  );
}