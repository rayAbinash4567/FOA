import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MyPartners from '@/components/MyPartners';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <MyPartners />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
