"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setError("Jeton de réinitialisation de mot de passe manquant.")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!token) {
      setError("Jeton de réinitialisation de mot de passe manquant.")
      return
    }

    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.")
      return
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    setIsLoading(true)
    try {
      await authClient.email.resetPassword(token, password)
      setMessage("Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.")
      setTimeout(() => {
        router.push("/signin")
      }, 3000)
    } catch (err: any) {
      console.error("Reset password error:", err)
      setError(err.message || "Une erreur est survenue lors de la réinitialisation du mot de passe.")
    } finally {
      setIsLoading(false)
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
              <span className="gradient-text">Réinitialiser le mot de passe</span>
            </CardTitle>
            <CardDescription>
              Entrez votre nouveau mot de passe.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message && <p className="text-sm text-green-500 text-center">{message}</p>}
              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className={error ? "border-destructive" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className={error ? "border-destructive" : ""}
                />
              </div>

              <Button type="submit" className="w-full mt-6 h-11 font-semibold" disabled={isLoading || !token}>
                {isLoading ? "Chargement..." : "Réinitialiser le mot de passe"}
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