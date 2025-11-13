"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Camera } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionResponse: any = await authClient.getSession()
        if (!sessionResponse) {
          router.push("/signin")
          return
        }
        
        // Accéder aux données utilisateur de manière plus sûre
        let userData = null;
        if (sessionResponse.data && sessionResponse.data.user) {
          userData = sessionResponse.data.user;
        } else if (sessionResponse.user) {
          userData = sessionResponse.user;
        }
        
        if (userData) {
          const userProfile: UserProfile = {
            id: userData.id,
            name: userData.name || "",
            email: userData.email || "",
            image: userData.image || ""
          };
          
          setUser(userProfile);
          setName(userProfile.name);
          setEmail(userProfile.email);
          setImage(userProfile.image || "");
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)
    
    try {
      // Note: Dans une implémentation réelle, vous auriez ici un appel à une API
      // pour mettre à jour le profil de l'utilisateur
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulation d'API
      
      // Mise à jour locale de l'utilisateur
      if (user) {
        setUser({
          ...user,
          name,
          email,
          image
        })
      }
      
      setMessage({ type: "success", content: "Profil mis à jour avec succès !" })
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage({ type: "error", content: "Erreur lors de la mise à jour du profil." })
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push("/signin")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du profil</CardTitle>
          <CardDescription>
            Mettez à jour vos informations personnelles ici
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback className="text-2xl">
                    {name ? name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Changer la photo de profil</p>
            </div>

            {message && (
              <div className={`p-3 rounded-md ${message.type === "success" ? "bg-green-500/20 text-green-500" : "bg-destructive/20 text-destructive"}`}>
                {message.content}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de l&apos;image</Label>
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" disabled={updating} className="flex-1">
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  "Mettre à jour le profil"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/dashboard/profile/change-password")}
              >
                Changer le mot de passe
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/dashboard/profile/2fa")}
              >
                Double authentification
              </Button>
              <Button type="button" variant="outline" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}