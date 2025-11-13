"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Team {
  id: string
  name: string
  members: number
  createdAt: string
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Équipe Développement",
    members: 12,
    createdAt: "2023-01-15"
  },
  {
    id: "2",
    name: "Équipe Marketing",
    members: 8,
    createdAt: "2023-02-20"
  },
  {
    id: "3",
    name: "Équipe Design",
    members: 5,
    createdAt: "2023-03-10"
  }
]

export function TeamList() {
  return (
    <div className="space-y-4">
      {mockTeams.map((team) => (
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
                    {team.members} membres
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
      
      {mockTeams.length === 0 && (
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