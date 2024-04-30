import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '../layouts/AdminLayout';
import Cookies from 'js-cookie';

export const Route = createFileRoute('/me')({
  component: UserProfile
})

function UserProfile() {

  const userDetails = JSON.parse(Cookies.get('efficacy_user') ?? '');

  return (
    <AdminLayout
      title={userDetails.firstname + " " + userDetails.lastname}
      subtitle={userDetails.email}
      showBack={true}>
      <></>
    </AdminLayout>
  );
}