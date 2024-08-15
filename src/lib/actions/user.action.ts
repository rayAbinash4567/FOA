'use server';

import { db } from '@/db/db';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { liveblocks } from '../liveblocks';
import { parseStringify } from '../utils';

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
};

// ^  Check for User : If user is partner or not

export async function getPartner() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const user = await db.user.findUnique({
      where: { externalUserId: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const partner = await db.partner.findUnique({
      where: { userId: user.id },
    });

    if (!partner) {
      throw new Error('Partner not found');
    }

    return partner;
  } catch (error) {
    console.error('Error processing getPartner request:', error);
    throw error;
  }
}

// ^  Check for User : If user is partner or not

// export async function fetchPartners() {
//   try {
//     const partners = await db.partner.findMany({
//       select: {
//         id: true,
//         firstName: true,
//         lastName: true,
//         companyName: true,
//         companySize: true,
//         country: true,
//         city: true,
//         state: true,
//         vocation: true,
//         industry: true,
//         // Add any other fields you need
//       },
//     });
//     return partners;
//   } catch (error) {
//     console.error('Failed to fetch partners:', error);
//     throw new Error('Failed to fetch partners');
//   }
// }
