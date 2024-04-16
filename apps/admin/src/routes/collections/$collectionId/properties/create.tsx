import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import { SetStateAction, useState } from 'react';
import Notiflix from 'notiflix';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import axios from 'axios';
import { collectionPropertySchema, collectionPropertyUISchema } from '../../../../configurations';
import { Fab } from '@mui/material';
import AdminLayout from '../../../../layouts/AdminLayout';

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
        if (errorData.length > 0) {
            Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
        }
        let request: any = formData;
        request['collectionId'] = collectionId;
        await axios.post(`${baseURL}/api/collection/${collectionId}/property`, request, {
            headers: {
                Authorization: `${cookies.efficacy_token}`,
            },
        });
        Notiflix.Notify.success('Collection property added successfully.', undefined, { position: 'right-bottom' });
        navigate({ to: '/collections/' + collectionId });
    };

    const handleOnChange = async (data: SetStateAction<{}>, error) => {
        setFormData(data);
        setErrorData(error);
    }

    return (
        <AdminLayout
            title='New Collection Property'
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
                        schema={collectionPropertySchema}
                        uischema={collectionPropertyUISchema}
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