import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define public routes. 
// Adding 'index' and ensuring the root is explicitly handled.
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Check if the route is public
  if (!isPublicRoute(req)) {
    // 3. If not public, protect the route
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};