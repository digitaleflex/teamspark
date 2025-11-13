"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, TrendingUp, Lightbulb } from "lucide-react"
import { DashboardLoading } from "@/components/dashboard-loading"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sessionError, setSessionError] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authClient.getSession()
        if (!session) {
          router.push("/signin")
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error("Error checking session:", error)
        setSessionError(true)
        router.push("/signin")
      }
    }
    checkSession()
  }, [router])

  if (sessionError) {
    return (
      <div className="md:ml-64 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Erreur de session. Redirection...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="md:ml-64 min-h-screen p-4 md:p-6 bg-background">
        <DashboardLoading />
      </div>
    )
  }

  const upcomingFeatures = [
    {
      title: "KPIs en Temps Réel",
      description: "Tableau de bord complet avec métriques clés de performance",
      icon: TrendingUp,
      status: "Prochainement",
    },
    {
      title: "IA Prédictive",
      description: "Anticipez les défis et identifiez les opportunités",
      icon: Lightbulb,
      status: "Prochainement",
    },
    {
      title: "Culture Pulse",
      description: "Mesurez et améliorez la culture et le bien-être de l'équipe",
      icon: Users,
      status: "Prochainement",
    },
    {
      title: "Optimisation Temps Réel",
      description: "Recommandations IA pour optimiser la productivité",
      icon: Zap,
      status: "Prochainement",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Bien bienvenue, <span className="gradient-text">Jean Dupont</span> !
        </h1>
        <p className="text-lg text-muted-foreground">Prêt à transformer votre équipe avec la puissance de l&apos;IA</p>
      </section>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Équipes Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Équipes sous supervision</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/5 border-secondary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Membres Totaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Collaborateurs actifs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-accent/5 border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Score Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-1">Moyenne générale</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Features */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Prochaines Étapes</h2>
          <p className="text-muted-foreground mt-1">
            Découvrez les fonctionnalités à venir qui vont révolutionner votre gestion d&apos;équipe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="hover:border-primary/50 transition-colors group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 md:p-8 border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Commencez à transformer votre équipe</h3>
            <p className="text-muted-foreground max-w-lg">
              Créez une première équipe, invitez vos collaborateurs et lancez les analyses d&apos;IA pour optimiser
              votre performance collective.
            </p>
          </div>
          <Button className="w-full md:w-auto gap-2 h-11 px-6 font-semibold whitespace-nowrap">
            <Users className="w-4 h-4" />
            Créer une Équipe
          </Button>
        </div>
      </section>
    </div>
  )
}