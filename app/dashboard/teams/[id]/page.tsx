import { TeamDetails } from "@/components/teams/team-details"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface TeamDetailPageProps {
  params: {
    id: string
  }
}

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Détails de l&apos;équipe</h1>
          <p className="text-muted-foreground">
            Gérez les membres et les paramètres de votre équipe
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/teams/${params.id}/edit`}>Modifier</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/teams">Retour aux équipes</Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informations de l&apos;équipe</CardTitle>
          <CardDescription>
            Détails et paramètres de l&apos;équipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamDetails teamId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}