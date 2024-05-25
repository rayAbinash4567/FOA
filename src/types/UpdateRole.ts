// role string user string

// Path: src/types/updateRole.ts

// Defines specific roles as string literals
export type UserRole = 'client' | 'partner';

// If you have specific user-related types, they should reflect actual use cases.
// For example, if you need to type a function or object that requires a user ID, you might use:
export type UserIdentity = {
  userId: string;
};
