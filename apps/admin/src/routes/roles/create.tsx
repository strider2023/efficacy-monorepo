import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useState, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import AdminChildLayout from '../../layouts/AdminChildLayout';
import { roleSchema, roleUISchema } from '../../configurations';
import Notiflix from 'notiflix';

export const Route = createFileRoute('/roles/create')({
    component: CreateRole
})

function CreateRole() {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [cookies] = useCookies(["efficacy_token"]);
    const [formData, setFormData] = useState({});
    const [errorData, setErrorData] = useState([]);

    const handleSave = async () => {
        console.log(formData, errorData);
        if (errorData.length == 0) {
            const response = await axios.post(baseURL + '/api/roles', formData, {
                headers: {
                    Authorization: `${cookies.efficacy_token}`,
                },
            });
            console.log(response.data);
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
            pageName='Create Role'
            showSave='Create Role'
            onSave={handleSave}>
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
        </AdminChildLayout>
    );
}