"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!email || !email.includes("@")) {
      setError("Veuillez entrer un email valide.")
      return
    }

    setIsLoading(true)
    try {
      await authClient.email.createPasswordResetToken(email)
      setMessage("Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.")
    } catch (err: any) {
      console.error("Forgot password error:", err)
      setError(err.message || "Une erreur est survenue lors de l'envoi du lien de réinitialisation.")
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
              <span className="gradient-text">Mot de passe oublié ?</span>
            </CardTitle>
            <CardDescription>
              Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {message && <p className="text-sm text-green-500 text-center">{message}</p>}
              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={error ? "border-destructive" : ""}
                />
              </div>

              <Button type="submit" className="w-full mt-6 h-11 font-semibold" disabled={isLoading}>
                {isLoading ? "Chargement..." : "Envoyer le lien de réinitialisation"}
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