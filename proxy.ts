import { auth } from "@/auth"
import { NextResponse } from "next/server"

const publicRoutes = ["/login", "/", "/guest"]
const authRoutes = ["/login"]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  
  // Allow auth API routes to pass through
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  if (nextUrl.pathname.startsWith("/api/verify-code")) {
    return NextResponse.next();
  }

  if (nextUrl.pathname.startsWith("/api/send-feedback")) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    )
  }

  if (nextUrl.pathname.match(/\.(jpg|jpeg|png|svg|gif|webp)$/)) {
  return NextResponse.next()
}


  return NextResponse.next()
})

// export const config = {
//   matcher: ["/((?!api/authauth|api/verify-code|api/send-feedback|_next/static|_next/image|favicon.ico).*)"],
// }

export const config = {
  matcher: [
    "/((?!api/auth|api/verify-code|api/send-feedback|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|gif|webp)$).*)",
  ],
}
