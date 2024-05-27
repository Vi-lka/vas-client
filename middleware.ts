import {
    clerkMiddleware,
    createRouteMatcher
} from '@clerk/nextjs/server';
import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
  
const isProtectedRoute = createRouteMatcher([
    '/account(.*)',
    '/admin(.*)',
]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"])
  
export default clerkMiddleware((auth, req: NextRequest) => {
    const { userId, sessionClaims } = auth();

    // For users visiting /onboarding, don't try to redirect
    if (userId && isOnboardingRoute(req)) {
        return NextResponse.next();
    }

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && isProtectedRoute(req)) {
        const signInUrl = new URL("/sign-in", req.url);
        return NextResponse.redirect(signInUrl);
    }

    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    if (userId && !sessionClaims?.metadata?.onboardingComplete) {
        const onboardingUrl = new URL("/onboarding", req.url);
        return NextResponse.redirect(onboardingUrl);
    }

    // If the user is logged in and the route is protected, let them view.
    if (userId && isProtectedRoute(req)) return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};