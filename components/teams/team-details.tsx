"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

interface TeamDetailsProps {
  teamId: string
}

const mockTeam = {
  id: "1",
  name: "Équipe Développement",
  description: "Équipe responsable du développement frontend et backend de l'application",
  members: [
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      role: "Lead Developer"
    },
    {
      id: "2",
      name: "Marie Martin",
      email: "marie.martin@example.com",
      role: "Frontend Developer"
    },
    {
      id: "3",
      name: "Pierre Bernard",
      email: "pierre.bernard@example.com",
      role: "Backend Developer"
    }
  ] as TeamMember[]
}

export function TeamDetails({ teamId }: TeamDetailsProps) {
  // Dans une vraie application, vous feriez un appel API ici
  // const team = await getTeamById(teamId)
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{mockTeam.name}</h2>
        <p className="text-muted-foreground">
          {mockTeam.description}
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
          {mockTeam.members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
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