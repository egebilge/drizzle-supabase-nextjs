import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({
            request,
          });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/auth",
    "/login",
    "/sign-up",
    "/sign-up-success",
    "/forgot-password",
    "/update-password",
    "/confirm", // Email confirmation route
    "/error", // Error pages
  ];

  // Define static asset patterns that should be ignored
  // These patterns help the middleware skip authentication checks for:
  // - Static files (CSS, JS, images, fonts) that don't need auth
  // - Next.js internal routes (_next/*) that handle static assets
  // - API routes that may have their own auth logic
  const staticAssetPatterns = [
    /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
    /^\/_next\//,
    /^\/api\//,
  ];

  const currentPath = request.nextUrl.pathname;

  // Check if current path is a static asset
  const isStaticAsset = staticAssetPatterns.some((pattern) => pattern.test(currentPath));

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some((route) => currentPath.startsWith(route));

  // Determine if route requires authentication
  const requiresAuth = !isStaticAsset && !isPublicRoute;

  // Handle authenticated users trying to access auth pages
  if (user && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Handle unauthenticated users trying to access protected routes
  if (!user && requiresAuth) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    // Preserve the original URL as a redirect parameter
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
