import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MemberProfile from '@/components/MemberProfile';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Pinnacle Partnerships Member Profile Page | Partnerships Profile Page',
  description: 'This is our Partners  Profile Page',
};

const MemberDirectoryLayout = () => {
  return (
    <DefaultLayout>
      <MemberProfile />
    </DefaultLayout>
  );
};

export default MemberDirectoryLayout;
