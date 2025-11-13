"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Jeton de vérification manquant.")
      return
    }

    const verifyEmail = async () => {
      try {
        // Utilisons une approche défensive pour gérer les différentes façons d'appeler la vérification d'email
        let response: any;
        
        // Essayons différentes méthodes de vérification d'email
        const verificationMethods = [
          // Méthode 1: via le namespace email (si disponible)
          () => {
            const emailClient = (authClient as any).email;
            if (emailClient && typeof emailClient.verifyEmail === 'function') {
              return emailClient.verifyEmail(token);
            }
            throw new Error("Method not available");
          },
          // Méthode 2: directement sur authClient
          () => {
            if (typeof (authClient as any).verifyEmail === 'function') {
              return (authClient as any).verifyEmail(token);
            }
            throw new Error("Method not available");
          }
        ];
        
        // Essayons chaque méthode jusqu'à ce qu'une fonctionne
        let success = false;
        for (const method of verificationMethods) {
          try {
            response = await method();
            success = true;
            break;
          } catch (err) {
            // Continue to next method
            continue;
          }
        }
        
        // Si aucune méthode n'a fonctionné
        if (!success) {
          throw new Error("Méthode de vérification d'email non disponible");
        }
        
        if (response.error) {
          throw new Error(response.error.message)
        }
        setStatus("success")
        setMessage("Votre email a été vérifié avec succès ! Vous allez être redirigé vers la page de connexion.")
        setTimeout(() => {
          router.push("/signin")
        }, 3000)
      } catch (error: any) {
        console.error("Email verification error:", error)
        setStatus("error")
        setMessage(error.message || "Une erreur est survenue lors de la vérification de votre email.")
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-text">TeamSpark</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-center w-full">
        <Card className="w-full max-w-md border-border/50">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              <span className="gradient-text">Vérification d'email</span>
            </CardTitle>
            <CardDescription>
              Vérification de votre adresse email
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              {status === "loading" && (
                <>
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="text-center text-muted-foreground">Vérification de votre email en cours...</p>
                </>
              )}

              {status === "success" && (
                <>
                  <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                  <p className="text-center text-green-500 font-medium">{message}</p>
                </>
              )}

              {status === "error" && (
                <>
                  <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                  <p className="text-center text-destructive font-medium">{message}</p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => router.push("/signin")}
                  >
                    Retour à la connexion
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}