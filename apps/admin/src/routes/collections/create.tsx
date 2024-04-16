import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box, Fab } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { SetStateAction, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { collectionSchema, collectionUISchema } from '../../configurations';
import Notiflix from 'notiflix';
import AdminLayout from '../../layouts/AdminLayout';

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
        if (errorData.length > 0) {
            Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
        }
        await axios.post(baseURL + '/api/collection', formData, {
            headers: {
                Authorization: `${cookies.efficacy_token}`,
            },
        });
        Notiflix.Notify.success('Collection created successfully.', undefined, { position: 'right-bottom' });
        navigate({ to: '/collections/' });
    };

    const handleOnChange = async (data: SetStateAction<{}>, error: any) => {
        setFormData(data);
        setErrorData(error);
    }

    return (
        <AdminLayout
            title='New Collection'
            subtitle='Entity Management'
            showBack={true}
            menuItem={
                <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={handleSave}>
                    <i className="ti ti-device-floppy menu-item-icon"></i>
                </Fab>
            }>
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
        </AdminLayout>
    );
}