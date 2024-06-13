import PartnerDashboard from '@/components/Dashboard/PartnerDashboard';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import MemberDirectory from '@/components/MemberDirectory';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Pinnacle Partnerships Dashboard | Real Estate Network',
  description: 'This is a dashboard for Pinnacle Partnerships.',
};

export default function Home() {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata?.role;
  console.log(role);

  return (
    <>
      <DefaultLayout>
        {role === 'partner' ? <PartnerDashboard /> : <MemberDirectory />}
      </DefaultLayout>
    </>
  );
}
