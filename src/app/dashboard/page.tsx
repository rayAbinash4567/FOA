import ECommerce from '@/components/Dashboard/E-commerce';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title:
    'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

export default function Home() {
  return (
    <>
      {/* <div className="flex flex-col gap-y-4">
        <h1>Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div> */}
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
