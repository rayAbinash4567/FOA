import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MemberDirectory from '@/components/MemberDirectory';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <MemberDirectory />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
