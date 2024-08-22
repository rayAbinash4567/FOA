import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Messages from '@/components/Messages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Directory | Partnerships Directory ',
  description: 'This is our Partnerships  Directory',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <Messages />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
