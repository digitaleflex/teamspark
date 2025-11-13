"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Users2, TrendingUp, Activity } from "lucide-react"

interface ActivityItem {
  id: string
  action: string
  target: string
  timestamp: string
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState({
    totalTeams: 0,
    totalMembers: 0,
    recentActivity: [] as ActivityItem[]
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/analytics")
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données d'analyse")
        }
        
        const data = await response.json()
        setAnalyticsData(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des données d'analyse:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analyse</h1>
          <p className="text-muted-foreground">
            Aperçu de vos statistiques et activités
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-accent rounded animate-pulse" />
                <div className="h-8 w-8 bg-accent rounded-full animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-6 w-16 bg-accent rounded animate-pulse" />
                <div className="h-4 w-20 bg-accent rounded animate-pulse mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Historique des actions récentes dans votre application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-10 w-10 bg-accent rounded-full animate-pulse" />
                  <div className="ml-4 space-y-1 flex-1">
                    <div className="h-4 w-32 bg-accent rounded animate-pulse" />
                    <div className="h-3 w-24 bg-accent rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-20 bg-accent rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analyse</h1>
        <p className="text-muted-foreground">
          Aperçu de vos statistiques et activités
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipes</CardTitle>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalTeams}</div>
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
            <div className="text-2xl font-bold">{analyticsData.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Membres au total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card hover:bg-accent transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activité</CardTitle>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.recentActivity.length}</div>
            <p className="text-xs text-muted-foreground">
              Actions récentes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Historique des actions récentes dans votre application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.target}
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}