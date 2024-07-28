import { liveblocks } from '@/lib/liveblocks';
import { getUserColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return redirect('/sign-in');
    }
    // console.log('clerkUser', clerkUser);
    const fullName = `${clerkUser?.firstName} ${clerkUser?.lastName}`;

    const userData = {
      id: clerkUser.id,
      info: {
        id: clerkUser.id,
        email: clerkUser?.emailAddresses[0]?.emailAddress,
        name: fullName,
        avatar: clerkUser.imageUrl,
        color: getUserColor(clerkUser.id),
      },
    };
    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: userData.info.email,
        groupIds: [], // Optional
      },
      { userInfo: userData.info }
    );
    return new Response(body, { status });
  } catch (error) {
    console.error('Error processing GET request:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
