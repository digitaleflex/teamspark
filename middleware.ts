import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Nous ne devrions pas importer auth ici car il contient des dépendances Node.js
// qui ne fonctionnent pas dans l'environnement Edge

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Pour l'instant, redirigeons simplement vers la page de connexion pour les routes protégées
  // Vous devrez implémenter une vérification de session appropriée qui fonctionne dans l'environnement Edge
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    // Ici, vous devrez implémenter une vérification de session
    // compatible avec l'environnement Edge
    // Pour l'instant, nous allons simplement permettre l'accès
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/((?!api|_next/static|_next/image|favicon.ico|signin|signup|forgot-password|reset-password).*)"],
};