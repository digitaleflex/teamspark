"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"

interface Team {
  id: string
  name: string
  members: {
    userId: string
  }[]
  createdAt: string
}

export function TeamList() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/teams")
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des équipes")
        }
        
        const data: Team[] = await response.json()
        setTeams(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des équipes:", err)
        setError("Impossible de charger les équipes")
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
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
    )
  }

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <Card key={team.id} className="hover:bg-accent transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {team.members.length} membres
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/dashboard/teams/${team.id}`}>Voir détails</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {teams.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucune équipe trouvée</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/teams/new">Créer votre première équipe</Link>
          </Button>
        </div>
      )}
    </div>
  )
}