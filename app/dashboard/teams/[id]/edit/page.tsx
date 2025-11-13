"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Team {
  id: string
  name: string
  description: string | null
}

export default function EditTeamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [team, setTeam] = useState<Team | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/teams/${params.id}`)
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'équipe")
        }
        
        const data: Team = await response.json()
        setTeam(data)
        setName(data.name)
        setDescription(data.description || "")
      } catch (err) {
        console.error("Erreur lors de la récupération de l'équipe:", err)
        setError("Impossible de charger les détails de l'équipe")
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setError(null)

    try {
      const response = await fetch(`/api/teams/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la mise à jour de l'équipe")
      }

      router.push(`/dashboard/teams/${params.id}`)
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour de l'équipe:", err)
      setError(err.message || "Impossible de mettre à jour l'équipe")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Modifier l&apos;équipe</h1>
          <p className="text-muted-foreground">
            Une erreur s&apos;est produite lors du chargement de l&apos;équipe
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Modifier l&apos;équipe</h1>
          <p className="text-muted-foreground">
            Équipe non trouvée
          </p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">L&apos;équipe que vous recherchez n&apos;existe pas.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => router.push("/dashboard/teams")}
              >
                Retour aux équipes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Modifier l&apos;équipe</h1>
        <p className="text-muted-foreground">
          Mettez à jour les informations de votre équipe
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l&apos;équipe</CardTitle>
          <CardDescription>
            Modifiez les détails de votre équipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/20 text-destructive rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l&apos;équipe *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom de votre équipe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description de votre équipe (optionnel)"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={updating} className="flex-1">
                {updating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mise à jour en cours...
                  </>
                ) : (
                  "Mettre à jour l'équipe"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push(`/dashboard/teams/${params.id}`)}
              >
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}