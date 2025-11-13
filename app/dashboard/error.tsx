"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RotateCcw, Home } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Enregistrer l'erreur dans un service de reporting
    console.error(error)
  }, [error])

  return (
    <div className="md:ml-64 min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Erreur dans le tableau de bord</h2>
          <p className="text-muted-foreground">
            Une erreur s'est produite lors du chargement du tableau de bord. Veuillez réessayer ou revenir à l'accueil.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={reset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Réessayer
          </Button>
          
          <Button variant="outline" asChild className="gap-2">
            <Link href="/dashboard">
              <Home className="w-4 h-4" />
              Tableau de bord
            </Link>
          </Button>
        </div>
        
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-destructive/10 rounded-lg text-left">
            <p className="text-sm font-medium text-destructive">Erreur de développement :</p>
            <p className="text-sm text-destructive/80 mt-1">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}