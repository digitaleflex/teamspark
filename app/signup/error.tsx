"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RotateCcw } from "lucide-react"

export default function SignupError({
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Erreur d'inscription</h2>
          <p className="text-muted-foreground">
            Une erreur s'est produite lors de la création de votre compte. Veuillez réessayer.
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
          
          <Button variant="outline" asChild>
            <Link href="/">Retour à l'accueil</Link>
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