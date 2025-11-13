"use client"

import type React from "react"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { AuthLoading } from "@/components/auth-loading"

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
  const [showVerificationMessage, setShowVerificationMessage] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const router = useRouter()

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

    // Vérifier si l'utilisateur est bloqué
    if (isBlocked) {
      setErrors({ general: "Trop de tentatives de connexion. Veuillez réessayer plus tard." })
      return
    }

    if (!validateForm()) return

    setIsLoading(true)
    try {
      if (mode === "signin") {
        const response: any = await authClient.signIn.email({
          email,
          password,
        })
        if (response.error) {
          // Gérer les erreurs de connexion
          if (response.error.message && response.error.message.includes("Invalid credentials")) {
            const newAttempts = loginAttempts + 1
            setLoginAttempts(newAttempts)
            
            // Bloquer après 5 tentatives
            if (newAttempts >= 5) {
              setIsBlocked(true)
              throw new Error("Trop de tentatives de connexion. Veuillez réessayer plus tard.")
            }
            
            throw new Error(`Email ou mot de passe incorrect. (${5 - newAttempts} tentatives restantes)`)
          } else {
            throw new Error(response.error.message || "Erreur de connexion")
          }
        }
        
        // Vérifier si la 2FA est requise
        // Vérifier si l'utilisateur a la 2FA activée
        const session = await authClient.getSession()
        if (session.data?.user?.twoFactorEnabled) {
          // Rediriger vers la page 2FA
          router.push("/signin-2fa")
        } else {
          // Rediriger vers le tableau de bord
          router.push("/dashboard")
        }
      } else { // signup
        // Extract name from email if not provided
        const name = email.split("@")[0];
        const response: any = await authClient.signUp.email({
          email,
          password,
          name,
        })
        if (response.error) {
          throw new Error(response.error.message || "Erreur d'inscription")
        }
        
        // Afficher un message demandant à l'utilisateur de vérifier son email
        setShowVerificationMessage(true)
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
          errorMessage = error.message;
        }
      }
      setErrors({ general: errorMessage })
    } finally {
      setIsLoading(false)
    }

    onSubmit?.(email, password)
  }

  if (showVerificationMessage) {
    return (
      <Suspense fallback={<AuthLoading />}>
        <Card className="w-full max-w-md border-border/50">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl gradient-text">Vérifiez votre email</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Un email de vérification a été envoyé à <strong>{email}</strong>. 
              Veuillez cliquer sur le lien dans l'email pour vérifier votre compte.
            </p>
            <Button 
              onClick={() => router.push("/signin")}
              className="w-full"
            >
              Continuer vers la connexion
            </Button>
          </CardContent>
        </Card>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<AuthLoading />}>
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
                disabled={isLoading || isBlocked}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isBlocked}
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
            <Button 
              type="submit" 
              className="w-full mt-6 h-11 font-semibold" 
              disabled={isLoading || isBlocked}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {mode === "signin" ? "Connexion..." : "Création du compte..."}
                </>
              ) : mode === "signin" ? (
                "Se connecter"
              ) : (
                "Créer un compte"
              )}
            </Button>

            {/* Links */}
            <div className="text-center text-sm">
              {mode === "signin" ? (
                <>
                  <Link href="/forgot-password" className="font-semibold text-primary hover:text-secondary transition-colors">
                    Mot de passe oublié ?
                  </Link>
                  <span className="mx-2">•</span>
                  <Link href="/signup" className="font-semibold text-primary hover:text-secondary transition-colors">
                    Créer un compte
                  </Link>
                </>
              ) : (
                <Link href="/signin" className="font-semibold text-primary hover:text-secondary transition-colors">
                  Déjà un compte ? Se connecter
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </Suspense>
  )
}