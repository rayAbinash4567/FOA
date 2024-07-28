import DefaultLayout from '@/components/Layouts/DefaultLayout';
import TransactionRoom from '@/components/TransactionRoom';
import { getDocument } from '@/lib/actions/room.actions';
import { getClerkUsers } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title:
    'Pinnacle Partnerships Transaction Portal | Partnerships New Transactions Directory ',
  description: 'This is our Transaction Portal',
};

declare type User = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: { emailAddress: string }[];
  email: string;
};

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const TransactionsLayout = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in');
  }

  const userEmail = clerkUser?.emailAddresses[0]?.emailAddress;
  if (!userEmail) {
    // Handle the case where the user doesn't have an email address
    redirect('/dashbord/membertransactions'); // or handle this case as appropriate for your app
  }

  const room = await getDocument({
    roomId: id,
    userId: userEmail,
  });

  if (!room) {
    redirect('/dashboard/membertransactions');
  }

  if (!room.usersAccesses) {
    console.error('User accesses not found for room:', id);
    redirect('/dashboard/membertransactions');
  }

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });
  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer',
  }));

  const currentUserType = room.usersAccesses[userEmail]?.includes('room:write')
    ? 'editor'
    : 'viewer';

  return (
    <DefaultLayout>
      <TransactionRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </DefaultLayout>
  );
};

export default TransactionsLayout;
