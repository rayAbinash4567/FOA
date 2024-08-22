import { getDocuments } from '@/lib/actions/room.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Messages: React.FC = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return redirect('/sign-in');
  }

  const role = clerkUser?.publicMetadata?.role as string;
  const transactions = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  return (
    <div className="col-span-12 xl:col-span-8">
      <div className="rounded-sm border border-stroke bg-white px-3 pb-1.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">Messages</div>
      </div>
    </div>
  );
};

export default Messages;
