import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MemberApplication from '@/components/MemberApplication';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js Form Layout | TailAdmin - Next.js Dashboard Template',
  description:
    'This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
};

const MemberApplicationPage = () => {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="FormLayout" /> */}

      <MemberApplication />
    </DefaultLayout>
  );
};

export default MemberApplicationPage;
