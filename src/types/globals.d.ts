export {};

// Create a type for the roles
export type Roles = 'admin' | 'partner';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
