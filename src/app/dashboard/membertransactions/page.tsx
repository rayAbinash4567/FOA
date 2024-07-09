import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MemberTransactionsDetails from '@/components/MemberTrasactions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <MemberTransactionsDetails />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
