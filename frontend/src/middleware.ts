import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/auth/callback']
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/auth/')

  // Redirect to login if accessing protected routes without authentication
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Handle authenticated users
  if (user) {
    const userRole = user.user_metadata?.role

    // If no role found, might be old user - redirect to login to set role
    if (!userRole && pathname !== '/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('message', 'Please select your role')
      return NextResponse.redirect(url)
    }

    // Redirect from landing page to dashboard
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = userRole === 'client' ? '/client/dashboard' : '/freelancer/dashboard'
      return NextResponse.redirect(url)
    }

    // Role-based access control
    if (pathname.startsWith('/client') && userRole !== 'client') {
      const url = request.nextUrl.clone()
      url.pathname = '/freelancer/dashboard'
      return NextResponse.redirect(url)
    }

    if (pathname.startsWith('/freelancer') && userRole !== 'freelancer') {
      const url = request.nextUrl.clone()
      url.pathname = '/client/dashboard'
      return NextResponse.redirect(url)
    }

    // Redirect authenticated users away from login page
    if (pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = userRole === 'client' ? '/client/dashboard' : '/freelancer/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}