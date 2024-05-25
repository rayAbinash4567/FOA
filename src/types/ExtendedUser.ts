interface ExtendedUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profileImageUrl?: string;
  // Add any fields you expect to interact with
  banned?: boolean;
  privateMetadata?: Record<string, any>; // This can store user-specific data that shouldn't be publicly accessible
  publicMetadata?: Record<string, any>; // This can store data that you might want to read on the client-side
  lastActiveAt?: Date; // Just as an example, if you keep track of user activity
}

export type { ExtendedUser };
