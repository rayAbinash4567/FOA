import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MyClients from '@/components/MyClients';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <MyClients />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
