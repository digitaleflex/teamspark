import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Analysez les performances et les statistiques de votre application
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs actifs</CardTitle>
            <CardDescription>
              Nombre d'utilisateurs actifs cette semaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              +15% par rapport à la semaine dernière
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taux de conversion</CardTitle>
            <CardDescription>
              Pourcentage de visiteurs convertis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenus mensuels</CardTitle>
            <CardDescription>
              Revenus générés ce mois-ci
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€12,450</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Historique des actions récentes dans votre application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">Nouvel utilisateur inscrit</p>
                <p className="text-sm text-muted-foreground">
                  jean.dupont@example.com
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                Il y a 5 minutes
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">Équipe créée</p>
                <p className="text-sm text-muted-foreground">
                  Équipe Marketing
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                Il y a 2 heures
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}