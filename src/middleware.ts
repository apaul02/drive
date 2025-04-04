import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be publicly accessible
const isPublicRoute = createRouteMatcher([
  '/', // Your homepage
  '/sign-in(.*)', // Your sign-in page and its potential sub-routes
  // Add any other public routes like API endpoints for webhooks if needed
  // '/api/webhooks/clerk',
]);

// Define routes that should always run the middleware but might be public or private
// Often includes API routes
const shouldRunMiddleware = createRouteMatcher([
  '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  '/(api|trpc)(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not public
  if (!isPublicRoute(req)) {
    auth.protect(); // If the route is not public, enforce authentication
  }
}, { debug: false }); // Enable debug for more logs if needed

export const config = {
  matcher: [
    // Run middleware on all routes except static assets and Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};