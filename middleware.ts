import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Stockage en mémoire pour les tentatives de connexion (dans une vraie application, utiliser Redis ou une base de données)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

// Nombre maximum de tentatives avant blocage
const MAX_ATTEMPTS = 5
// Durée de blocage en millisecondes (15 minutes)
const BLOCK_DURATION = 15 * 60 * 1000

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Vérifier si c'est une tentative de connexion
  if (pathname === "/api/auth/signin" && request.method === "POST") {
    // Extraire l'IP de différentes sources possibles
    const ip = 
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown"
    
    const now = Date.now()
    
    const attempt = loginAttempts.get(ip)
    
    // Vérifier si l'IP est bloquée
    if (attempt && attempt.count >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = now - attempt.lastAttempt
      if (timeSinceLastAttempt < BLOCK_DURATION) {
        return NextResponse.json(
          { error: "Trop de tentatives de connexion. Veuillez réessayer plus tard." },
          { status: 429 }
        )
      } else {
        // Réinitialiser les tentatives après la durée de blocage
        loginAttempts.delete(ip)
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/api/auth/:path*",
  ],
}