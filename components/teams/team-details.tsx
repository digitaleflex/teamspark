"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface TeamMember {
  id: string
  userId: string
  role: string
  user: {
    id: string
    name: string | null
    email: string
  }
}

interface Team {
  id: string
  name: string
  description: string | null
  ownerId: string
  members: TeamMember[]
}

interface TeamDetailsProps {
  teamId: string
}

export function TeamDetails({ teamId }: TeamDetailsProps) {
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/teams/${teamId}`)
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'équipe")
        }
        
        const data: Team = await response.json()
        setTeam(data)
      } catch (err) {
        console.error("Erreur lors de la récupération de l'équipe:", err)
        setError("Impossible de charger les détails de l'équipe")
      } finally {
        setLoading(false)
      }
    }

    if (teamId) {
      fetchTeam()
    }
  }, [teamId])

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

  if (!team) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Équipe non trouvée</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{team.name}</h2>
        <p className="text-muted-foreground">
          {team.description || "Aucune description"}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Membres de l&apos;équipe</CardTitle>
          <CardDescription>
            Liste de tous les membres de cette équipe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {team.members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{member.user.name ? member.user.name.charAt(0) : member.user.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{member.user.name || member.user.email}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.user.email}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">{member.role}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="flex gap-3">
        <Button>Inviter un membre</Button>
        <Button variant="outline">Modifier l&apos;équipe</Button>
        <Button variant="destructive">Supprimer l&apos;équipe</Button>
      </div>
    </div>
  )
}