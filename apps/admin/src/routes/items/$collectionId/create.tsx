import { createFileRoute, useNavigate } from '@tanstack/react-router';
import AdminChildLayout from '../../../layouts/AdminChildLayout';
import Box from '@mui/material/Box';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

const baseURL = import.meta.env.VITE_BASE_URL;

export const Route = createFileRoute('/items/$collectionId/create')({
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
        if (errorData.length == 0) {
            await axios.post(baseURL + '/api/collection/' + collectionId + '/item', formData);
            navigate({ to: '/items/' });
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
            pageGroup='Collection Item'
            pageName='Add Item'
            showSave='Save Item'
            onSave={handleSave}>
            <Box maxWidth="lg">
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
        </AdminChildLayout>
    );
}