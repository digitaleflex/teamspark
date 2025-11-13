import { TeamList } from "@/components/teams/team-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Équipes</h1>
          <p className="text-muted-foreground">
            Gérez vos équipes et leurs membres
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/teams/new">Créer une équipe</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Vos équipes</CardTitle>
          <CardDescription>
            Liste de toutes les équipes auxquelles vous appartenez
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamList />
        </CardContent>
      </Card>
    </div>
  )
}