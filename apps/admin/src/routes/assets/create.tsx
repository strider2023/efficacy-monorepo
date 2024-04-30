import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box, Fab } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { createAssetsSchema, createAssetsUISchema } from '../../configurations';
import Dropzone from 'react-dropzone';
import './index.scss';
import AdminLayout from '../../layouts/AdminLayout';

export const Route = createFileRoute('/assets/create')({
  component: CreateAsset
})

function CreateAsset() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({ path: '', description: '', tags: [] });
  const [errorData, setErrorData] = useState([]);
  const [file, setFile] = useState<any>();

  const handleSave = async () => {
    console.log(formData, errorData);
    if (!file) {
      Notiflix.Notify.warning('Please upload a file.', undefined, { position: 'right-bottom' });
    }
    if (errorData.length > 0) {
      Notiflix.Notify.warning('Please fix errors before proceeding.', undefined, { position: 'right-bottom' });
    }
    const request = new FormData();
    request.append('file', file);
    if (formData.path) {
      request.append('path', formData.path);
    }
    if (formData.description) {
      request.append('description', formData.description);
    }
    if (formData.tags.length > 0) {
      request.append('tags', formData.tags.toString());
    }
    const response = await axios.post(baseURL + '/api/assets/upload', request, {
      headers: {
        Authorization: `${cookies.efficacy_token}`
      },
    });
    Notiflix.Notify.success('File uploaded successfully.', undefined, { position: 'right-bottom' });
    console.log(response.data);
  };

  const handleOnChange = async (data: any, error: any) => {
    setFormData(data);
    setErrorData(error);
  }

  const onFileUploaded = (acceptedFiles: unknown[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }

  return (
    <AdminLayout
      title='New Asset'
      subtitle='Asset Management'
      showBack={true}
      menuItem={
        <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={handleSave}>
          <i className="ti ti-device-floppy menu-item-icon"></i>
        </Fab>
      }>
      <Box maxWidth="lg">
        <form onSubmit={handleSave}>
          <Dropzone onDrop={acceptedFiles => onFileUploaded(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone-container">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    file ? (<p>{file.name}</p>) : <p>Drag 'n' drop some files here, or click to select files</p>
                  }
                </div>
              </section>
            )}
          </Dropzone>
          <JsonForms
            schema={createAssetsSchema}
            uischema={createAssetsUISchema}
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