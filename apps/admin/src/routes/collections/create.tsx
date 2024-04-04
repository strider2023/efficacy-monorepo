import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SetStateAction, useState } from 'react';
import { useCookies } from 'react-cookie';
import AdminChildLayout from '../../layouts/AdminChildLayout';
import axios from 'axios';
import { collectionSchema, collectionUISchema } from '../../configurations';
import Notiflix from 'notiflix';

export const Route = createFileRoute('/collections/create')({
    component: CreateCollection
})

function CreateCollection() {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [cookies] = useCookies(["efficacy_token"]);
    const [formData, setFormData] = useState({});
    const [errorData, setErrorData] = useState([]);

    const handleSave = async () => {
        if (errorData.length == 0) {
            await axios.post(baseURL + '/api/collection', formData, {
                headers: {
                    Authorization: `${cookies.efficacy_token}`,
                },
            });
            navigate({ to: '/collections/' });
        } else {
            Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
        }
    };

    const handleOnChange = async (data: SetStateAction<{}>, error: any) => {
        setFormData(data);
        setErrorData(error);
    }

    return (
        <AdminChildLayout
            pageGroup='Entity Management'
            pageName='Create Collections'
            showSave='Save Collection'
            onSave={handleSave}>
            <Box maxWidth="lg">
                <form onSubmit={handleSave}>
                    <JsonForms
                        schema={collectionSchema}
                        uischema={collectionUISchema}
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