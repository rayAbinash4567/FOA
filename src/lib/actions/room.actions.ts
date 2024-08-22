'use server';
import { clerkClient } from '@clerk/nextjs/server';
import { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { liveblocks } from '../liveblocks';
import { getAccessType, parseStringify } from '../utils';
declare type CreateDocumentParams = {
  userId: string;
  email: string;
};
declare type UserType = 'creator' | 'editor' | 'viewer';
declare type AccessType = ['room:write'] | ['room:read', 'room:presence:write'];
declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};
declare type ShareDocumentParams = {
  roomId: string;
  email: string;
  userType: UserType;
  updatedBy: User;
};
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();
  try {
    const metadata = {
      creatorId: userId,
      email,
      title: '[LastName-Middle Initials-FirstName-County-Address] - [Date]',
    };
    const usersAccesses: RoomAccesses = {
      [email]: ['room:write'],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });
    revalidatePath('/');
    return parseStringify(room);
  } catch (error) {
    console.log('error');
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      // throw new Error('You cannot change access for  yourself ');
      throw new Error('You do not have access to this document');
    }
    revalidatePath(`/dashboard/transactions/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    revalidatePath(`/dashboard/transactions/${roomId}`);
    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while updating a room access: ${error}`);
  }
};

export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email });

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    // Check if the user is registered with Clerk
    const response = await clerkClient.users.getUserList({
      emailAddress: [email],
    });
    const users = response.data;

    if (users.length === 0) {
      return {
        success: false,
        message: `User is not registered in Pinnacle Partnerships. Please ask them to sign up first.`,
      };
    }

    // Fetch the room details first
    const room = await liveblocks.getRoom(roomId);

    // Check if the email is the transaction leader's email
    if (room.metadata.email === email) {
      return {
        success: false,
        message: 'You cannot change access for the transaction leader.',
      };
    }

    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };

    // Update the room access
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses,
    });

    if (updatedRoom) {
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: '$documentAccess',
        subjectId: notificationId,
        activityData: {
          userType,
          heading: `${updatedBy.name} invited you. `,
          title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email,
        },
        roomId,
      });
      revalidatePath(`/dashboard/transactions/${roomId}`);
      return {
        success: true,
        message: 'Access granted successfully.',
      };
    } else {
      throw new Error('Failed to update room access.');
    }
  } catch (error: unknown) {
    console.error('Error in updateDocumentAccess:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: errorMessage };
  }
};

export const removeCollaborator = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error('You cannot remove yourself from the document');
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null,
      },
    });

    revalidatePath(`/dashboard/transactions/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error: unknown) {
    console.log(`Error happened while removing a collaborator: ${error}`);
  }
};
export const deleteDocument = async (roomId: string, currentUserId: string) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    // Check if the current user is the creator of the document
    if (room.metadata.creatorId !== currentUserId) {
      throw new Error(
        'You cannot delete this document as you are not the creator.Please ask the transaction leader to remove you from the transaction.'
      );
    }

    await liveblocks.deleteRoom(roomId);
    revalidatePath(`/dashboard/transactions/${roomId}`);

    // Return success status
    return { success: true };
  } catch (error: unknown) {
    console.error('Error in deleteDocument:', error);

    // Provide a more detailed error message
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: errorMessage };
  }
};
