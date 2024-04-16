import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box, Fab } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState, useEffect, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { updateRoleSchema, updateRoleUISchema } from '../../../configurations';
import AdminLayout from '../../../layouts/AdminLayout';

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
    if (errorData.length > 0) {
      Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
    }
    await axios.put(`${baseURL}/api/roles/${roleId}`, formData, {
      headers: {
        Authorization: `${cookies.efficacy_token}`,
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