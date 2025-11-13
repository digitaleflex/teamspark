"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string | null
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const sessionResponse: any = await authClient.getSession()
        
        if (!sessionResponse || !sessionResponse.data) {
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
      // Appel à l'API réelle pour mettre à jour le profil
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          image
        })
      })
      
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil")
      }
      
      const updatedUser = await response.json()
      
      // Mise à jour locale de l'utilisateur
      if (user) {
        setUser({
          ...user,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image
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
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {message && (
              <div className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {message.content}
              </div>
            )}
            
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
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={updating}>
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  "Mettre à jour le profil"
                )}
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