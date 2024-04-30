import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { Fab } from '@mui/material';
import AdminLayout from '../../../../layouts/AdminLayout';

const baseURL = import.meta.env.VITE_BASE_URL;

export const Route = createFileRoute('/collections/$collectionId/items/create')({
    component: CreateCollectionItem,
    loader: async ({ params }) => {
        const template = await axios.get(baseURL + `/api/collection/${params.collectionId}/property/web/template`);
        return template.data
    }
})

function CreateCollectionItem() {
    const template = Route.useLoaderData();
    const navigate = useNavigate();
    const { collectionId } = Route.useParams();
    const [formData, setFormData] = useState({});
    const [errorData, setErrorData] = useState([]);

    const handleSave = async () => {
        console.log(formData, errorData);
        if (errorData.length > 0) {
            Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
        }
        await axios.post(baseURL + '/api/collection/' + collectionId + '/item', formData);
        Notiflix.Notify.success('Data added successfully.', undefined, { position: 'right-bottom' });
        navigate({ to: `/collections/${collectionId}/items/` });
    };

    const handleOnChange = async (data: SetStateAction<{}>, error) => {
        setFormData(data);
        setErrorData(error);
    }

    return (
        <AdminLayout
            title='New Collection Item'
            subtitle='Entity Management'
            showBack={true}
            menuItem={
                <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={handleSave}>
                    <i className="ti ti-device-floppy menu-item-icon"></i>
                </Fab>
            }>
            <Box maxWidth="lg" sx={{ p: 1 }}>
                <form onSubmit={handleSave}>
                    {template.uiSchema ? (
                        <JsonForms
                            schema={template.jsonSchema}
                            uischema={template.uiSchema}
                            data={formData}
                            renderers={materialRenderers}
                            cells={materialCells}
                            onChange={({ data, errors }) => handleOnChange(data, errors)}
                        />
                    ) : (
                        <JsonForms
                            schema={template.jsonSchema}
                            data={formData}
                            renderers={materialRenderers}
                            cells={materialCells}
                            onChange={({ data, errors }) => handleOnChange(data, errors)}
                        />
                    )}
                </form>
            </Box>
        </AdminLayout>
    );
}