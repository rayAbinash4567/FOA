import DefaultLayout from '@/components/Layouts/DefaultLayout';
import UserPortal from '@/components/UserPortal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const UserDashboardLayout = () => {
  return (
    <DefaultLayout>
      <UserPortal />
    </DefaultLayout>
  );
};

export default UserDashboardLayout;
