import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import { SetStateAction, useState } from 'react';
import Notiflix from 'notiflix';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import axios from 'axios';
import { collectionPropertySchema, collectionPropertyUISchema } from '../../../../configurations';
import AdminChildLayout from '../../../../layouts/AdminChildLayout';

export const Route = createFileRoute('/collections/$collectionId/properties/create')({
    component: CreateCollectionProperties
})

function CreateCollectionProperties() {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [cookies] = useCookies(["efficacy_token"]);
    const { collectionId } = Route.useParams();
    const [formData, setFormData] = useState({});
    const [errorData, setErrorData] = useState([]);

    const handleSave = async () => {
        if (errorData.length == 0) {
            let request: any = formData;
            request['collectionId'] = collectionId;
            await axios.post(`${baseURL}/api/collection/${collectionId}/property`, request, {
                headers: {
                    Authorization: `${cookies.efficacy_token}`,
                },
            });
            navigate({ to: '/collections/' + collectionId });
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
            pageGroup='Entity Management'
            pageName='Create Collection Property'
            showSave='Save Collection Porperty'
            onSave={handleSave}>
            <Box maxWidth="lg">
                <form onSubmit={handleSave}>
                    <JsonForms
                        schema={collectionPropertySchema}
                        uischema={collectionPropertyUISchema}
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