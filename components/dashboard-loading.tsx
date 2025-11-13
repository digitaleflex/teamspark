"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Users, Users2, TrendingUp, Activity, PlusCircle, Settings, Shield, BarChart3 } from "lucide-react"

export function DashboardLoading() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalMembers: 0,
    recentActivityCount: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Dans une vraie application, vous feriez un appel API ici
        // Pour l'instant, nous simulons des données
        setTimeout(() => {
          setStats({
            totalTeams: 3,
            totalMembers: 12,
            recentActivityCount: 5
          })
          setLoading(false)
        }, 1000)
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques:", err)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Welcome Skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Teams Skeleton */}
        <div>
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Features Skeleton */}
        <section className="space-y-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action Skeleton */}
        <section className="bg-card rounded-xl p-6 md:p-8 border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Skeleton className="h-6 w-64 mb-2" />
              <Skeleton className="h-5 w-96" />
            </div>
            <Skeleton className="h-11 w-48" />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Bienvenue sur TeamSpark</h1>
        <p className="text-muted-foreground">
          Gérez vos équipes et projets en toute simplicité
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipes</CardTitle>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeams}</div>
            <p className="text-xs text-muted-foreground">
              Équipes actives
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membres</CardTitle>
            <Users2 className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Membres au total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activité</CardTitle>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentActivityCount}</div>
            <p className="text-xs text-muted-foreground">
              Actions récentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Teams Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Vos équipes</h2>
          <Button asChild>
            <Link href="/dashboard/teams/new">
              <PlusCircle className="w-4 h-4 mr-2" />
              Créer une équipe
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary">5 membres</Badge>
              </div>
              <CardTitle className="text-xl">Équipe Marketing</CardTitle>
              <CardDescription>
                Gestion des campagnes et du contenu marketing
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="secondary">3 membres</Badge>
              </div>
              <CardTitle className="text-xl">Équipe Développement</CardTitle>
              <CardDescription>
                Développement et maintenance de l'application
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Upcoming Features */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Fonctionnalités à venir</h2>
          <p className="text-muted-foreground">
            Découvrez les nouvelles fonctionnalités qui seront bientôt disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline">Bientôt</Badge>
              </div>
              <CardTitle className="text-xl">Rapports Avancés</CardTitle>
              <CardDescription>
                Générez des rapports détaillés sur les performances de vos équipes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card hover:bg-accent transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline">Bientôt</Badge>
              </div>
              <CardTitle className="text-xl">Sécurité Renforcée</CardTitle>
              <CardDescription>
                Nouvelles options de sécurité pour protéger vos données
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-card rounded-xl p-6 md:p-8 border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Prêt à commencer ?</h3>
            <p className="text-muted-foreground">
              Créez votre première équipe et commencez à collaborer efficacement
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard/teams/new">
              <PlusCircle className="w-4 h-4 mr-2" />
              Créer une équipe
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
