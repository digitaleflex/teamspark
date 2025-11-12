"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { authClient } from "@/lib/auth-client" // Import authClient

interface AuthFormProps {
  mode: "signin" | "signup"
  onSubmit?: (email: string, password: string) => void
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter() // Initialize useRouter

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!email || !email.includes("@")) {
      newErrors.email = "Veuillez entrer un email valide"
    }
    if (!password || password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }
    if (mode === "signup" && password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({}) // Clear previous errors

    if (!validateForm()) return

    setIsLoading(true)
    try {
      if (mode === "signin") {
        await authClient.email.signIn({ email, password })
        router.push("/dashboard") // Redirect to dashboard on successful sign-in
      } else { // signup
        await authClient.email.signUp({ email, password })
        router.push("/dashboard") // Redirect to dashboard on successful sign-up
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      let errorMessage = "Une erreur est survenue."

      if (error.message) {
        if (error.message.includes("Invalid credentials")) {
          errorMessage = "Email ou mot de passe incorrect."
        } else if (error.message.includes("Email already in use")) {
          errorMessage = "Cet email est déjà utilisé."
        } else if (error.message.includes("User not found")) {
          errorMessage = "Utilisateur non trouvé."
        } else {
          errorMessage = error.message; // Use the raw message if not specifically handled
        }
      }
      setErrors({ general: errorMessage })
    } finally {
      setIsLoading(false)
    }

    onSubmit?.(email, password)
  }

  return (
    <Card className="w-full max-w-md border-border/50">
      <CardHeader className="space-y-2 text-center">
        {/* Logo and Branding */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>

        <CardTitle className="text-2xl">
          {mode === "signin" ? (
            <span className="gradient-text">Se connecter</span>
          ) : (
            <span className="gradient-text">Créer un compte</span>
          )}
        </CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Accédez à votre tableau de bord TeamSpark"
            : "Rejoignez TeamSpark et boostez votre équipe"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && <p className="text-sm text-destructive text-center">{errors.general}</p>}
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="vous@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mot de passe</Label>
              {mode === "signin" && (
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Mot de passe oublié ?
                </Link>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          {/* Confirm Password Field (Signup only) */}
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6 h-11 font-semibold" disabled={isLoading}>
            {isLoading ? "Chargement..." : mode === "signin" ? "Se connecter" : "Créer un compte"}
          </Button>

          {/* Toggle Link */}
          <div className="text-center text-sm">
            {mode === "signin" ? (
              <>
                Vous n&apos;avez pas de compte ?{" "}
                <Link href="/signup" className="font-semibold text-primary hover:text-secondary transition-colors">
                  S&apos;inscrire
                </Link>
              </>
            ) : (
              <>
                Vous avez déjà un compte ?{" "}
                <Link href="/signin" className="font-semibold text-primary hover:text-secondary transition-colors">
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
