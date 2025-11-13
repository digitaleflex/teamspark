import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="md:ml-64 min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Chargement du tableau de bord...</p>
      </div>
    </div>
  )
}