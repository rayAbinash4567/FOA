import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  console.log(auth);
  if (isProtectedRoute(req)) auth().protect();
  const userId = auth().userId;
  const path = req.nextUrl.pathname;
  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    const userPath = user.unsafeMetadata.userPath;

    // Allow access to homepage without authentication
    if (!userId && path === '/') {
      return NextResponse.next();
    }

    // If user hasn't selected a path and isn't on the onboarding page, redirect to onboarding
    if (!userPath && path !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }

    // If user has selected a path and is trying to access onboarding, redirect to dashboard
    if (userPath && path === '/onboarding') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Protect protected routes
    if (isProtectedRoute(req)) {
      // Add your protection logic here, e.g., checking user roles or permissions
      // For now, we'll just allow access if the user is authenticated
      return NextResponse.next();
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
