"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    // Validation des mots de passe
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", content: "Les nouveaux mots de passe ne correspondent pas." })
      setLoading(false)
      return
    }
    
    if (newPassword.length < 6) {
      setMessage({ type: "error", content: "Le nouveau mot de passe doit contenir au moins 6 caractères." })
      setLoading(false)
      return
    }
    
    try {
      const response = await authClient.changePassword({
        currentPassword,
        newPassword,
      })
      
      if (response.error) {
        throw new Error(response.error.message)
      }
      
      setMessage({ type: "success", content: "Mot de passe changé avec succès !" })
      
      // Réinitialiser les champs
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error("Error changing password:", error)
      setMessage({ 
        type: "error", 
        content: error.message || "Erreur lors du changement de mot de passe." 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Changer le mot de passe</h1>
        <p className="text-muted-foreground">
          Mettez à jour votre mot de passe de connexion
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Changement de mot de passe</CardTitle>
          <CardDescription>
            Entrez votre mot de passe actuel et votre nouveau mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-6">
            {message && (
              <div className={`p-3 rounded-md ${message.type === "success" ? "bg-green-500/20 text-green-500" : "bg-destructive/20 text-destructive"}`}>
                {message.content}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Changement en cours...
                  </>
                ) : (
                  "Changer le mot de passe"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/dashboard/profile")}
              >
                Retour au profil
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}