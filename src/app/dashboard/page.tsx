import ECommerce from '@/components/Dashboard/E-commerce';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Dashboard | Real Estate Network',
  description: 'This is a dashboard for Pinnacle Partnerships.',
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
