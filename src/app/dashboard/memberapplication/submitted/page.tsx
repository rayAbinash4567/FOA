import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MemberApplicationVieworUpdate from '@/components/MemberApplicationVieworUpdate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <MemberApplicationVieworUpdate />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
