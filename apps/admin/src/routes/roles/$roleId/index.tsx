import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import AdminChildLayout from '../../../layouts/AdminChildLayout';
import Notiflix from 'notiflix';
import AppDataView from '../../../components/AppDataView';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/roles/$roleId/')({
  component: ViewRole
})

function ViewRole() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { roleId } = Route.useParams();
  const [cookies] = useCookies(["efficacy_token"]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`${baseURL}/api/roles/${roleId}`,
      {
        headers: {
          Authorization: `${Cookies.get('efficacy_token')}`,
        },
      }).then((resp) => {
        setFormData(resp.data);
      })
  }, [baseURL, roleId]);

  const handleDelete = async () => {
    Notiflix.Confirm.show(
      'Delete Role',
      'Are you sure you want to delete this role?',
      'Yes',
      'No',
      function okCb() {
        axios.delete(`${baseURL}/api/roles/${roleId}`,
          {
            headers: {
              Authorization: `${cookies.efficacy_token}`,
            },
          }).then(() => {
            navigate({ to: '/roles' });
          })
      }
    );
  };

  const handleEdit = () => {
    navigate({ to: '/roles/' + roleId + '/edit' });
  }

  return (
    <AdminChildLayout
      pageGroup='Permissions Management'
      pageName='View Role'>
      <AppDataView data={formData} />
    </AdminChildLayout>
  );
}