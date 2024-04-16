import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box, Fab } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useState, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { roleSchema, roleUISchema } from '../../configurations';
import Notiflix from 'notiflix';
import AdminLayout from '../../layouts/AdminLayout';

export const Route = createFileRoute('/roles/create')({
    component: CreateRole
})

function CreateRole() {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [cookies] = useCookies(["efficacy_token"]);
    const [formData, setFormData] = useState({});
    const [errorData, setErrorData] = useState([]);

    const handleSave = async () => {
        if (errorData.length > 0) {
            Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
        }
        const response = await axios.post(baseURL + '/api/roles', formData, {
            headers: {
                Authorization: `${cookies.efficacy_token}`,
            },
        });
        console.log(response.data);
        Notiflix.Notify.success('File uploaded successfully.', undefined, { position: 'right-bottom' });
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
            <Box maxWidth="lg">
                <form onSubmit={handleSave}>
                    <JsonForms
                        schema={roleSchema}
                        uischema={roleUISchema}
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