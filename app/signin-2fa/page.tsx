"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function SignIn2FAPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Vérifier si l'utilisateur a une session 2FA en attente
  useEffect(() => {
    const check2FASession = async () => {
      try {
        // Vérifier si l'utilisateur est connecté
        const session = await authClient.getSession()
        if (!session || !session.data) {
          // Pas de session, rediriger vers la page de connexion
          router.push("/signin")
          return
        }
        
        // Vérifier si la 2FA est activée pour cet utilisateur
        if (!session.data.user?.twoFactorEnabled) {
          // 2FA non activée, rediriger vers le tableau de bord
          router.push("/dashboard")
          return
        }
        
        // L'utilisateur a une session valide et la 2FA activée
        // On peut rester sur cette page
      } catch (err) {
        console.error("Error checking 2FA session:", err)
        router.push("/signin")
      }
    }
    
    check2FASession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Utilisons une approche défensive comme dans le composant profile 2FA
      let response: any;
      // Essayons d'abord la méthode verify
      try {
        response = await (authClient.twoFactor as any).verify({
          code,
        })
      } catch (verifyError) {
        // Si verify n'existe pas, essayons verifyTotp
        try {
          response = await (authClient.twoFactor as any).verifyTotp({
            code,
          })
        } catch (totpError) {
          // Si aucune méthode ne fonctionne, lançons l'erreur d'origine
          throw verifyError;
        }
      }
      
      if (response.error) {
        throw new Error(response.error.message)
      }
      
      // Connexion 2FA réussie, rediriger vers le tableau de bord
      router.push("/dashboard")
    } catch (err: any) {
      console.error("2FA verification error:", err)
      setError(err.message || "Code 2FA invalide")
    } finally {
      setLoading(false)
    }
  }

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
              <span className="gradient-text">Double Authentification</span>
            </CardTitle>
            <CardDescription>
              Entrez le code de votre application d'authentification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
              
              <div className="space-y-2">
                <Label htmlFor="code">Code 2FA</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={loading}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button type="submit" className="w-full mt-6 h-11 font-semibold" disabled={loading || code.length !== 6}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  "Vérifier"
                )}
              </Button>

              <div className="text-center text-sm">
                <Link href="/signin" className="font-semibold text-primary hover:text-secondary transition-colors">
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}